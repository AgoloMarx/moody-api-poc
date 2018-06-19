// Cronjob for crawling and summarizing articles

import { CronJob } from 'cron';
import colors from 'colors';
import Crawler from 'services/crawler';

async function initCronJob() {
  /* Seconds, minutes, hours, day of month, months, day of week */
  const crawlContentTimes = '00 00 07 * * *';
  let crawlContentJob = new CronJob(crawlContentTimes, () => crawler.articles.saveAndSummarizeToDb(), null, true, 'America/New_York');
  console.log('> Crawling Web for articles and summarizing...'.bold.blue, crawlContentTimes.yellow, crawlContentJob.cronTime.hour);
}

export default initCronJob;