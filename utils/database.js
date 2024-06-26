import mongoose from 'mongoose';

let isConnected = false; // for track the Connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already Connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DATABASE,
    });
    isConnected = true;
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
};
 