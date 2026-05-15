import mongoose from 'mongoose';

let isConnected = false; // track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.DATABASE_URL) {
    return console.log('DATABASE_URL is not defined');
  }

  if (isConnected) {
    return console.log('=> using existing database connection');
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL);

    isConnected = true;
    console.log('=> MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};
