import moment from 'moment-timezone';

const trimArticle = (article) => {
  return {
    articleId: article._id,
    site: article.sources[0].name,
    text: article.text,
    title: article.title,
    url: article.url,
    publishedAt: moment(article.published_at).tz('America/New_York').format('LL'), // June 20, 2018
  }
}

export default trimArticle;