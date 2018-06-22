import mongoose from 'mongoose';

if (process.env.NODE_ENV === 'local') {
  require('dotenv').config();
}

const ArticleSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  summary_title: String,
  summary_points: Array,
  site_name: String,
  site_url: String,
  article_url: String,
  original_text: String,
  original_header: String,
  summarized: Boolean,
  project: String,
  date_written: String
});

const connection = mongoose.createConnection(process.env.MONGO_URL);
const Article = connection.model('Article', ArticleSchema);

export default Article;