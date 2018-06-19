// Cronjob for crawling and summarizing articles
import colors from 'colors';
import Crawler from 'services/crawler';
import cron from 'node-cron';
import crawler from '../services/crawler';
import moment from 'moment-timezone';

async function initCronJob() {
  /* Seconds, minutes, hours, day of month, months, day of week */
  let crawlContentTimes = '00 00 07 * * *';
  // let crawlContentJob = new CronJob(crawlContentTimes, () => crawler.articles.saveAndSummarizeToDb(), null, true, 'America/New_York');
  // const companyCrawlJob = new cron.CronJob({
  //   cronTime: '00 00 07 * * *',
  //   onTick: () => crawler.articles.saveAndSummarizeToDb(),
  //   start: true,
  //   timeZone: 'America/New_York'
  // });
  // companyCrawlJob.start();
  // console.log('> Company crawl job status:', companyCrawlJob.running);
  const companyCrawlJob = cron.schedule('* * 07 * *', function () {
    console.log(`> Starting daily crawl at: ${moment().tz('America/New_York').format('LLLL')}`);
    crawler.articles.saveAndSummarizeToDb();
  }, false);
  companyCrawlJob.start();
}

export default initCronJob;