import React, { useContext, useEffect } from 'react'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Otp from './pages/Otp';
import { TodoContext } from './context/TodoContext';
import axios from 'axios';

function App() {
  const {setName,setId,setEmail} = useContext(TodoContext);

  useEffect(()=>{
    console.log(document.cookie);
    const apiCall = async()=>{
      try {
        const res = await axios.get('https://todo-api-kax0.onrender.com/api/v1/auth/user-auth',{
          headers:{Authorization:`${document.cookie}`}  
        });
        console.log(res.data);
        const data = res.data.data;
        console.log(data);
        setId(data.id);
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.log(error);
      }
    }

    if(document.cookie){
      apiCall();
    }
  },[]);
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/otp-verification' element={<Otp />} />
      </Routes>
    </div>
  );
}

export default App;
