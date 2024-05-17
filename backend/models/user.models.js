import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true,
    },
    email:{
      type:String,
      required:true,
      trim:true,
    },
    password:{
      type:String,
      required:true,
      trim:true,
    },
    todo:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Todo"
    }],
    token:{
      type:String,
    },
  },
  {
    timestamps:true
  }
);

export const User = mongoose.model("User",userSchema);