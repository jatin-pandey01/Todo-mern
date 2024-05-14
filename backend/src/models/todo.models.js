import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:true,
      trim:true,
    },
    body:{
      type:String,
      trim:true,
      required:true,
    }
  },
  {
    timestamps:true
  }
);

export const Todo = mongoose.model("Todo", todoSchema);