const mongoose = require('mongoose');

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

const Article = mongoose.model('Article', ArticleSchema);

export default Article;