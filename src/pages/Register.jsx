import React,{useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye,IoIosEyeOff } from "react-icons/io";
import { TodoContext } from '../context/TodoContext';
import axios from 'axios';


const Register = () => {
  const [isEyeOpen,setIsEyeOpen] = useState(false);
  const {name, email, password, setEmail,setName, setPassword} = useContext(TodoContext);
  const navigate = useNavigate();
  const [message,setMessage] = useState("");

  useEffect(()=>{
    if(document.cookie){
      navigate('/');
    }
  },[]);

  const submit = async(e)=>{
    e.preventDefault();
    if(!name || !email || !password ){
      setMessage("All fields are required.");
      return;
    }
    else if(!email.includes('@')){
      setMessage("Sorry, wrong email id.");
      return;
    }
    else{
      try {
        const res = await axios.post('https://todo-api-kax0.onrender.com/api/v1/auth//send-otp',{
          email:email
        });
        const data = res.data;
        console.log(data);
        if(!data.success){
          setMessage(data.message);
        }
      } catch (error) {
        console.log(error);
      }
      navigate('/otp-verification');
    }
  }

  return (
    <div className='flex flex-col justify-center h-[80vh] items-center gap-10'>
      <p className='text-white font-semibold tracking-wider text-xl'> Dear user, please register below </p>
      <form className='flex flex-col justify-center gap-6'>
        
        <input type='text' value={name} onChange={(e)=>{setName(e.target.value);
          setMessage('');
        }} className='outline-none text-white px-3 rounded-lg py-2 w-72 bg-slate-600 placeholder:text-white placeholder:opacity-75' required placeholder='Name' />

        <input type='text' value={email} onChange={(e)=>{setEmail(e.target.value);setMessage('');}} className='outline-none text-white px-3 rounded-lg py-2 w-72 bg-slate-600 placeholder:text-white placeholder:opacity-75' required placeholder='Email Id' />
        
        <div className='relative w-72'>
          <input type={isEyeOpen ? 'text' : 'password'} value={password} placeholder='Password' className='outline-none text-white px-3 rounded-lg py-2 w-72 bg-slate-600 
          placeholder:text-white placeholder:opacity-75' required onChange={(e)=>{setPassword(e.target.value);setMessage('');}} />
          <p className='absolute top-2 right-4'>
          {
            isEyeOpen ? 
            <IoIosEyeOff color='black' fontSize={25} onClick={()=>{setIsEyeOpen(false)}} /> : 
            <IoIosEye color='black' fontSize={25} onClick={()=>{setIsEyeOpen(true)}} />
          }
          </p>
          
        </div>
        <div className='flex flex-col'>
          <button type='submit' className='text-white w-64 mx-auto bg-green-600 py-1 rounded text-xl font-medium hover:bg-green-800' onClick={submit}> Register </button>
          <p className='text-red-700 text-lg font-medium text-center'> {message} </p>
        </div>
      </form>
      <div className='flex w-72 justify-center'>
        <p className='text-white pr-3'> Already have an account ? </p>
        <Link className='text-red-400 cursor-pointer hover:text-red-600' to={'/login'}> Login </Link>
      </div>
    </div>
  )
}

export default Register;