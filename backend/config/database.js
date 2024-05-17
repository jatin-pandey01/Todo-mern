import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connectDB = async()=>{
  try {
    const connectInstance = await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log(`\nMongoDB Connected !! , DB Host : ${connectInstance.connection.host}`);
  } catch (e) {
    console.log("Error : ", e);
    process.exit(1);    
  }
}

export default connectDB;