import axios from 'axios';
import Agolo from 'services/Agolo';
import cheerio from 'cheerio';
import colors from 'colors';
import moment from 'moment-timezone';
import { uniq } from 'underscore';
import puppeteer from 'puppeteer';

import Article from '../models/article';
import { COMPANY_SITES } from '../constants';

// Types for Flow
type crawlParamsType = {
  articleUrls: Array<string>,
  articlePrependUrl: string,
  articleHeaderSelector: string,
  articleDateSelector: string,
  articleTextSelector: string,
  hasWriter: boolean,
  hasHeader: boolean,
  hasDate: boolean,
}

type articleType = {
  date: string,
  header: string,
  text: string,
  writer: string,
  url: string,
}

type siteArticlesWithInfoType = {
  siteArticles: Array<articleType>,
  name: string,
  url: string,
}

// Similar to agolo.js, TOOD: Refactor to type.js file in constant
type summarizerOptions = {
  title: string,
  text: string,
  summary_length: number,
  coref: boolean,
  sort_by_salience: boolean,
  include_all_sentences: boolean,
}

function crawler() {
  this.articles = {
    /**
     * @description Gets all articleUrls from a open news web page
     */
    getUrls: async (url: string, articleListSelector: string) => {
      try {
        console.log(colors.yellow(`> [Crawling] for article Urls ${url}`));
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle2'], timeout: 0 });
        const html = await page.content();
        const $ = cheerio.load(html);
        const articles = $(articleListSelector);
        let articleUrls: Array<string> = [];

        // Push all articles into array
        for (let i = 0; i < articles.length; i++) {
          articleUrls.push(`${articles[i].attribs.href}`);
        }

        // Clean articles to remove duplicate links if any
        articleUrls = uniq(articleUrls);
        console.log(colors.green.bold(`> Found ${articleUrls.length} unique article links`));
        return articleUrls;
      } catch (error) {
        console.log('> Error in crawling for article urls: ', error.message);
      }
    },
    /**
     * @description Gets article content from an article web page
     */
    getContent: async (crawlParams: crawlParamsType) => {
      const {
        articleUrls,
        articlePrependUrl,
        articleHeaderSelector,
        articleDateSelector,
        articleTextSelector,
        hasWriter,
        hasHeader,
        hasDate
      } = crawlParams;
      let siteArticles = [];
      for (let i = 0; i < articleUrls.length; i++) {
        try {
          const articleUrl = articleUrls[i];
          console.log(colors.bold.green(`> [Scraping] article url for content: ${articlePrependUrl}${articleUrl}`));
          const browser = await puppeteer.launch({ headless: true });
          const page = await browser.newPage();
          await page.goto(`${articlePrependUrl}${articleUrl}`, { waitUntil: ['load', 'domcontentloaded', 'networkidle2'], timeout: 0 });
          const html = await page.content();
          const $ = cheerio.load(html);
          const articleHeader = hasHeader ? $(articleHeaderSelector).text() : '';
          const articleWriter = hasWriter ? $(articleHeaderSelector).text() : '';
          const articleDate = hasDate ? $(articleDateSelector).text() : '';
          const articleText = $(articleTextSelector).text();
          const article: articleType = {
            date: articleDate,
            header: articleHeader,
            text: articleText,
            writer: articleWriter,
            url: `${articlePrependUrl}${articleUrl}`,
          }
          // TODO: Do not push all article that are written more than 24 hours ago.
          siteArticles.push(article);
        } catch (error) {
          console.log(`Error scraping url: ${articleUrls[i]}: \n ${error.message}`);
        }
      }
      return siteArticles;
    },
    /**
     * @description Crawl all article urls from a list of company sites and subsequently crawl all their contents
     */
    getAll: async (companies: Array<any>) => {
      let allSitesArticles = [];
      for (let i = 0; i < companies.length; i++) {
        try {
          const company = companies[i];
          const articleUrls: Array<string> = await this.articles.getUrls(company.url, company.articleListSelector);
          const siteArticles = await this.articles.getContent({
            articleUrls,
            articlePrependUrl: company.articlePrependUrl,
            articleHeaderSelector: company.articleHeaderSelector,
            articleDateSelector: company.articleDateSelector,
            articleTextSelector: company.articleTextSelector,
            hasWriter: company.hasWriter,
            hasHeader: company.hasHeader,
            hasDate: company.hasDate,
          });
          const siteArticlesWithInfo: siteArticlesWithInfoType = {
            siteArticles,
            name: company.name,
            url: company.url,
          }
          allSitesArticles.push(siteArticlesWithInfo);
        } catch (error) {
          console.log('> Error in getAll: ', error.message);
        }
      }
      return allSitesArticles;
    },
    /**
     * @description save each article from each
     */
    saveAndSummarizeToDb: async () => {
      const allSitesArticles: Array<siteArticlesWithInfoType> = await this.articles.getAll(COMPANY_SITES);
      for (let i = 0; i < allSitesArticles.length; i++) {
        const siteArticlesWithInfo: siteArticlesWithInfoType = allSitesArticles[i];
        const { name, url, siteArticles } = siteArticlesWithInfo;
        for (let j = 0; j < siteArticles.length; j++) {
          const article: articleType = siteArticles[j];
          const originalText: string = article.text;
          const originalHeader: string = article.header;
          const options: summarizerOptions = {
            title: article.header,
            text: article.text,
            summary_length: 10,
            coref: false,
            sort_by_salience: true,
            include_all_sentences: false,
          };
          const { summary_title, summary_points } = await Agolo.summarizer.summarize(options);
          const summarizedArticle = {
            summary_title: summary_title,
            summary_points: summary_points,
            site_name: name,
            site_url: url,
            article_url: article.url,
            original_text: originalText,
            original_header: originalHeader,
            summarized: true,
            project: 'IB-III',
            date_written: article.date,
          };
          const query = { article_url: summarizedArticle.article_url };
          // Only save articles of unique article urls
          await Article.findOneAndUpdate(query, summarizedArticle, { upsert: true }, function (error) {
            if (error) {
              console.log('> Error saving article:', error.message);
            }
            console.log(colors.bold.cyan(`> [Saving] Summarized Article to Db: ${summarizedArticle.article_url}`));
          });
        }
      }
    }
  }
}

const Crawler = new crawler();
export default Crawler;
