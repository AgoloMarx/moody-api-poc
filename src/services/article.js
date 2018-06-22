import moment, { lang } from 'moment-timezone';

import Article from '../models/article';
import AgoloArticle from '../models/agoloArticle';
import Cluster from '../models/cluster';
import Feed from '../models/feed';
import trimCluster from '../utils/trimCluster';
import trimArticle from '../utils/trimArticle';

// Mapping of Feed Ids to project
const projectToFeedId = {
  'IR-I': '5b2b989ca71f7b2ffc7401ac', // Production feed
  'IR-II': '5b2acbbb2d25a39cf00935ca', // Production feed
  'IR-III': '5b2acbec2d25a39cf00935cb', // Production feed
  'IB-I': '5b2ba0dda71f7b2ffc7401b0', // Production feed
  'IB-II': '5b2ba12ba71f7b2ffc7401b2', // Production feed
  'IB-III-feed': '5b2ba2672d25a39cf00935d1', // Production feed
}

const DUMP = [{
  articles: [{
    articleId: 'aasdma',
    site: 'Bloombergview',
    text: 'Donald Trump, in an interview...',
    title: 'Nixon failed',
    url: 'www.google.com',
    publishedAt: 'June 19 2018'
  },
  {
    articleId: 'aasdma',
    site: 'Bloombergview',
    text: 'Donald Trump, in an interview...',
    title: 'Nixon failed',
    url: 'www.google.com',
    publishedAt: 'June 18 2018'
  }],
  cluster: {
    clusterId: 'a;sdmas;d',
    points: ['Hello', 'world'],
    summary_title: 'Donald Trump!',
    score: 5.00,
    date_written: 'June 20, 2018',
  }
}];

const SCRAPED_PROJECTS = ['IB-III'];

function article() {
  this.projects = {
    getAll: async () => {
    },
    get: async (projectId: string) => {
      console.log('> Fetching articles for project:', projectId);
      // Check if project is manually scraped. If it is, use main DB
      if (SCRAPED_PROJECTS.includes(projectId)) {
        const articles = await Article.find({ project: projectId });
        return articles;
      }

      // If project is a feed on Agolo webapp, use Agolo DB to get cluster
      const feedId = projectToFeedId[projectId];
      if (!feedId) {
        return [];
      }
      console.log(`> Project ${projectId} belongs to Feed: "${feedId}"`);
      let startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() - 1);
      const clusters = await Cluster.find({
        feed_id: feedId,
        'timestamps.article_timestamps.first_article_published': { $gte: startDate, $exists: true }, // Only get clusters joined last 48 hours
        // 'timestamps.article_timestamps.latest_article_published': { $gte: startDate, $exists: true },
        summary: { $exists: true, $ne: null, $not: { $size: 0, }, },
        articles: { $exists: true, $ne: null, $not: { $size: 0, }, },
        deleted: { $ne: true },
      }, 'title summary articles score _id last_updated_at');
      let fullClusters = [];
      console.log(`Found ${clusters.length} for project ${projectId}`);
      // Naively look for all articles belonging to a cluster, an improvement would be to query for all articles matching the feed and then matching it with the cluster of interest
      for (let i = 0; i < clusters.length; i++) {
        let articles = [];
        let cluster = clusters[i];
        const articleIds = cluster.articles;
        for (let j = 0; j < articleIds.length; j++) {
          const articleId = articleIds[j];
          const article = await AgoloArticle.findOne({ _id: articleId }, 'url text sources title _id published_at');
          // Save articles that make up the cluster
          articles.push(trimArticle(article));
        }
        // Do not pass down fields we are not interested in
        const trimmedCluster = trimCluster(cluster);
        const fullCluster = {
          articles,
          cluster: trimmedCluster,
        }
        fullClusters.push(fullCluster);
      }
      return fullClusters;
    },
  }
}

const ArticleService = new article();
export default ArticleService;