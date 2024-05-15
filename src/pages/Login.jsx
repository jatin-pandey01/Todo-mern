import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosEye,IoIosEyeOff } from "react-icons/io";

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isEyeOpen,setIsEyeOpen] = useState(false);

  return (
    <div className='flex flex-col justify-center h-[80vh] items-center gap-10'>
      <p className='text-white font-semibold tracking-wider text-xl'> Dear user, please login below </p>
      <form className='flex flex-col justify-center gap-6'>
        <input type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='outline-none text-white px-3 rounded-lg py-2 w-72 bg-slate-400 placeholder:text-white placeholder:opacity-75' required placeholder='Email Id' />
        <div className='relative w-72'>
          <input type={isEyeOpen ? 'text' : 'password'} value={password} placeholder='Password' className='outline-none text-white px-3 rounded-lg py-2 w-72 bg-slate-400 
          placeholder:text-white placeholder:opacity-75' required onChange={(e)=>{setPassword(e.target.value)}} />
          <p className='absolute top-2 right-4'>
          {
            isEyeOpen ? 
            <IoIosEyeOff color='black' fontSize={25} onClick={()=>{setIsEyeOpen(false)}} /> : 
            <IoIosEye color='black' fontSize={25} onClick={()=>{setIsEyeOpen(true)}} />
          }
          </p>
          
        </div>
        <button className='text-white w-64 mx-auto bg-green-600 py-1 rounded text-xl font-medium hover:bg-green-800'> Login </button>
      </form>
      <div className='flex w-72 justify-center'>
        <p className='text-white pr-3'> Don't have an account ? </p>
        <Link className='text-red-400 cursor-pointer hover:text-red-600' to={'/register'}> Register </Link>
      </div>
    </div>
  )
}

export default Login;