import { User } from "../models/user.models.js";
import {Todo} from '../models/todo.models.js';

export const getAllTodo = async(req,res)=>{
  try {
    const {email} = req.body;
    const userDetails = await User.findOne({email:email});
    console.log(`Hello : ${email}`);
    if(!userDetails){
      return res.status(401).json({
        success:false,
        message:"Please login",
      });
    }

    const todos = await User.findOne({email:email}).populate("todo").exec();
    return res.status(200).json({
      success:true,
      data:todos,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Something went wrong, please relaod",
    });
  }
}

export const createTodo = async(req,res)=>{
  try {
    const {id,title,body} = req.body;
    const userDetails = await User.findById(id);
    if(!userDetails){
      return res.status(401).json({
        success:false,
        message:"Please login",
      });
    }

    const newTodo = await Todo.create({title:title,body:body});
    const updateUser = await User.findByIdAndUpdate(id,{$push:{todo:newTodo._id}},{new:true}).populate('todo').exec();
    return res.status(200).json({
      success:true,
      data:updateUser.todo,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Something went wrong, please try again.",
    });
  }
}

export const deleteTodo = async(req,res)=>{
  try {
    const {userId,todoId} = req.body;
    const userDetails = await User.findById(userId);
    if(!userDetails){
      return res.status(401).json({
        success:false,
        message:"Please login",
      });
    }
    console.log(todoId);
    const updateUser = await User.findByIdAndUpdate(userId,{$pull:{todo:todoId}},{new:true}).populate('todo').exec();
    console.log(updateUser);
    return res.status(200).json({
      success:true,
      data:updateUser.todo,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Something went wrong, please try again.",
    });
  }
}