import mongoose from "mongoose";
import mailSender from '../utils/mailSender.js'

const otpSchema = new mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
    },
    otp:{
      type:String
    },
    createdAt:{
      type:Date,
      default:Date.now(),
      expires:5*60*1000,
    }
  }
);

async function sendVerificationEmail(email,otp){
  try {
      const mailResponse = mailSender(email,"Verification email from JP Todo",`OTP : ${otp}`);
      console.log("Email sent successfully => ",mailResponse);
  }
  catch (error) {
      console.log(`Error in sending verification mail in OTP model : ${error}`);
      throw error;
  }
}

otpSchema.pre('save',async function(next){
  await sendVerificationEmail(this.email,this.otp);
  next();
});

export const OTP = mongoose.model('OTP',otpSchema);