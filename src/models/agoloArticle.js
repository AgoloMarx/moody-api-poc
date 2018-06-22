import mongoose from 'mongoose';
import mongfloat from 'mongoose-float';
const Float = mongfloat.loadType(mongoose); // Work around package since Mongoose do not natively support Float

if (process.env.NODE_ENV === 'local') {
  require('dotenv').config();
}

const ArticleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  original_id: String,
  text: String,
  sources: Array,
  published_at: Date,
  retrieved_at: Date,
  title: String,
  url: String,
  feed_ids: Array,
});

const connection = mongoose.createConnection(process.env.AGOLO_MONGO_URL);
const AgoloArticle = connection.model('articles', ArticleSchema);

export default AgoloArticle;