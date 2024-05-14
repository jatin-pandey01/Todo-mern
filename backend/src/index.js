import express from "express";
import { config } from "dotenv";
import connectDB from "./config/database.js";
import auth from './routes/auth.routes.js';
import cors from 'cors';

config();
const app = express();
const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
  app.on("error",(error)=>{
    console.log("\nError while connecting with express : ",error);
    throw error;
  });
  app.listen(PORT,()=>{
    console.log(`App listening on Port : ${PORT}`);
  })
})
.catch((e)=>{
  console.log("MongoDB Error : ", e);
});

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  return res.json({
    success:true,
    message:"Server running on home route"
  });
})

console.log(auth);
app.use('/api/v1/auth',auth);