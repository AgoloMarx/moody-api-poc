import mongoose from 'mongoose';

if (process.env.NODE_ENV === 'local') {
  require('dotenv').config();
}

const FeedSchema = new mongoose.Schema({
  _id: String,
  name: String,
  paused: Boolean,
  deleted: Boolean,
  created_at: Date,
  start_time: Date,
  end_time: Date,
  query: String,
  suggestedKeywords: Array,
  user_id: String,
  users: Array,
  selectedSources: Array,
  sources: Object,
  kafka_partition_id: Number,
  percolatorQuery: Object,
  historical_query: Object,
});

const connection = mongoose.createConnection(process.env.AGOLO_MONGO_URL);
const Feed = connection.model('feeds', FeedSchema);

export default Feed;
