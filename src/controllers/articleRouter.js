import ArticleService from 'services/article';
import express from 'express';
import Crawler from 'services/crawler'; // For test

let articleRouter = express.Router();

/* Fetches the summarized articles in the last 24/7 given a project */
articleRouter.get('/project/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const articles = await ArticleService.projects.get(projectId);
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
    })
    res.status(200).send(articles);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

articleRouter.get('/crawl/:projectId', async (req, res) => {
  try {
    const results = await Crawler.articles.saveAndSummarizeToDb();
    res.status(200).send('Crawl done!');
  } catch(error) {
    res.status(500).send({ error: error.message });
  }
});


export default articleRouter;
