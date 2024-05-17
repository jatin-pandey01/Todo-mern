import { User } from "../models/user.models.js";
import { OTP } from "../models/otp.models.js";
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();

export const sendOtp = async(req,res) => {
  try {
    const {email} = req.body;

    const checkUserExists = await User.findOne({emailId:email});

    if(checkUserExists){
      return res.status(401).json({
        success:false,
        message:"User already registered"
      });
    }

    var otp = otpGenerator.generate(
      6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
      }
    );

    var otpExist = await OTP.findOne({otp:otp});

    while(otpExist){
      otp = otpGenerator.generate(
        6,{
          upperCaseAlphabets:false,
          lowerCaseAlphabets:false,
          specialChars:false
        }
      );

      otpExist = await OTP.findOne({otp:otp});
    }

    const otpBody = await OTP.create({email:email,otp:otp});

    return res.status(200).json({
      success:true,
      message:"OTP sent successfully",
    });
    
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:'Error in OTP sending',
    });
  }
}

export const signUp = async(req,res) => {
  try {
    const {name,email,password,otp} = req.body;

    if(!name || !email || !password || !otp){
      return res.status(403).json({
        success:false,
        message:"All fields are required"
      });
    }

    const checkUserExists = await User.findOne({email:email});

    if(checkUserExists){
      return res.status(401).json({
        success:false,
        message:"User already registered"
      });
    }

    const recentOtp = await OTP.find({email:email}).sort({createdAt:-1}).limit(1);

    if(recentOtp.length == 0){
      return res.status(400).json({
        success:false,
        message:"OTP not found"
      });
    }
    else if(recentOtp[0].otp != otp){
      console.log(recentOtp[0].otp);
      return res.status(400).json({
        success:false,
        message:"Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const userDetails = await User.create({
      name:name,
      email:email,
      password:hashedPassword
    });

    const payload = {
      email:email,
      name:name,
      id:userDetails._id
    };

    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});
    userDetails.password = undefined;

    const options = {
      expires: new Date(Date.now()+3*24*60*60*1000),
      httpOnly:true,
    }

    return res.cookie("token",token,options).status(200).json({
      success:true,
      message:"User registered successfully",
      data:userDetails,
      token:token,
    });

  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:'Sorry, something went wrong. Please try again',
    });
  }
}

export const login = async(req,res) => {
  try {
    const {email,password} = req.body;

    if(!email || !password){
      return res.status(403).json({
        success:false,
        message:"All fields are required"
      });
    }

    const checkUserExist = await User.findOne({email:email});

    if(!checkUserExist){
      return res.status(401).json({
        success:false,
        message:"Account does not exist",
      });
    }

    if(await bcrypt.compare(password,checkUserExist.password)){

      const payload = {
        email:checkUserExist.email,
        name:checkUserExist.name,
        id:checkUserExist._id
      };

      const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});
      checkUserExist.password = undefined;

      const options = {
        expires: new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true,
      }

      return res.cookie("token",token,options).status(200).json({
        success:true,
        message:"Logged in successfully",
        data:checkUserExist,
        token:token,
      });
    }
    else{
      return res.status(401).json({
        success:false,
        message:'Wrong password, please try again'
      });
    }

  } 
  catch (e) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:'Sorry, something went wrong. Please try again'
    })  
  }
};

export const userAuth = async(req,res)=>{
  try {
    const token = req.header("Authorization").split('=')[1];
    if(!token){
      return res.status(401).json({
        success:false,
        message:"User not exist",
      });
    }
    console.log(`\n Token sir : ${token}`);
    try {
      console.log(process.env.JWT_SECRET);
      const decode = jwt.verify(token,process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
      return res.status(200).json({
        success:true,
        message:"User is authorized",
        data:decode,
      });
    } catch (error) {
      return res.status(401).json({
        success:false,
        message:"Unvalid, please login again"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Something went wrong, please reload page."
    })
  }
}