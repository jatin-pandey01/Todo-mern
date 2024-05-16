import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../context/TodoContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const Home = () => {
  const {todo,setTodo,id,name,email} = useContext(TodoContext);
  const [user,setUser] = useState([]);

  useEffect(()=>{
    console.log(email);
    const apiCall = async()=>{
      try {
        const res = await axios.get('http://localhost:3000/api/v1/auth/user-auth',{
          headers:{Authorization:`${document.cookie.split(';')[0]}`}
        });
        console.log(res.data);
        setUser(res.data.data);
        const data = res.data.data;
        console.log(data);
        const res2 = await axios.post('http://localhost:3000/api/v1/todo/get-all-todo',{
          email:data.email,
        });
        console.log(res2.data.data.todo);
        setTodo(res2.data.data.todo);
      } catch (error) {
        console.log(error);
      }
    }
    apiCall();
  },[]);

  const deleteClick = async(todoId)=>{
    try {
      const res = await axios.post('http://localhost:3000/api/v1/todo/delete-todo',{
        userId:user.id,
        todoId:todoId,
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {
        document.cookie ? <div>
          {
            todo && todo.map((data,index)=>{
              return <div key={index} className='text-white rounded-lg sm:m-10 sm:p-5 flex flex-col gap-3 bg-slate-600 shadow-lg'>
                <div className='flex justify-between items-center'>
                <p className='font-semibold text-2xl'> Title :  {data.title} </p>
                <MdDelete className='text-red-500 text-3xl cursor-pointer' onClick={()=>{deleteClick(data._id)}}/>
                </div>
                <p className=''> {data.body} </p>
                <p> Create date :  {data.createdAt.split('T')[1].split('Z')[0]} , {data.createdAt.split('T')[0]}</p>
              </div>
            })
          }
        </div> : <div className='h-[80vh] flex flex-col justify-center gap-5 items-center'>
          <p className='text-white text-2xl'> Hello user, Please login </p>
          <Link to={'/login'} className='text-black bg-green-500 px-4 py-2 text-xl rounded-lg font-semibold'> Login </Link>
        </div>
      }
    </div>
  )
}

export default Home;