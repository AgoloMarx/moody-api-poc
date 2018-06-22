import mongoose from 'mongoose';
import mongfloat from 'mongoose-float';
const Float = mongfloat.loadType(mongoose); // Work around package since Mongoose do not natively support Float

if (process.env.NODE_ENV === 'local') {
  require('dotenv').config();
}

const ClusterSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _text_index: Array,
  _title_index: Array,
  active: Number,
  articles: Array,
  created_at: Date,
  dates: Array,
  feed_id: String,
  last_updated_at: Date,
  photos: Array,
  score: Float,
  scores: Array,
  size: Number,
  sources: Array,
  summary: Array,
  summary_uptodate: Boolean,
  timestamps: Object,
  title: String,
});

const connection = mongoose.createConnection(process.env.AGOLO_MONGO_URL);
const Cluster = connection.model('clusters', ClusterSchema);

export default Cluster;
