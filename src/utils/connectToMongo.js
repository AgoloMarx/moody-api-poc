import mongoose from 'mongoose';
import Article from '../models/article';

function connectToMongo() {
  mongoose.connect(process.env.MONGO_URL, async function (err, client) {
    if (err) {
      console.log('> Error connecting to DB:', err.message);
    }
    console.log('> Successfully connected to mongoDB');
  });
}

export default connectToMongo;