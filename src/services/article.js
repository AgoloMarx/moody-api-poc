import Article from '../models/article';

function article() {
  this.projects = {
    getAll: async () => {

    },
    get: async (projectId: string) => {
      console.log('> Fetching articles for project:', projectId);
      const articles = await Article.find({ project: projectId });
      return articles;
    },
  }
}

const ArticleService = new article();
export default ArticleService;
