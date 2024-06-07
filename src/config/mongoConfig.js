import mongoose from "mongoose";

export const connnectMongoDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    con && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
