import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext';
import axios from 'axios';

const CreateTodo = () => {
  const {setCreateTodo,id,setTodo} = useContext(TodoContext);
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');

  const sendData = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('https://todo-api-kax0.onrender.com/api/v1/todo/create-todo',{
        id:id,
        title:title,
        body:body,
      });
      console.log(res.data.data);
      setCreateTodo(false);
      setTodo(res.data.data);
    } catch (error) {
      console.log(error);
    }
    console.log(title);
    console.log(body);
  }
  return (
    <div className='modal-backdrop' onClick={()=>{setCreateTodo(false);}}>
      <div className='blue-glassmorphism pb-5 flex flex-col justify-center items-center' 
        onClick={e => {e.stopPropagation();}}>
        <form className='p-5 flex flex-col gap-5 relative' >
          <input type='text' name='title' value={title} placeholder='Write Title' className='outline-none text-black px-3 rounded-lg py-2' required onChange={(e)=>{setTitle(e.target.value)}}/>
          <textarea cols={10} rows={4} value={body} placeholder='Write more about todo' className='outline-none resize-none text-gray-600 px-3 rounded-lg py-2' required onChange={(e)=>{setBody(e.target.value)}} />
        </form>
        <div className="flex justify-around items-center flex-wrap w-full">
          <button className='bg-red-500 tracking-wider w-fit rounded-lg px-3 py-1 mt-2 hover:bg-red-800' onClick={()=> setCreateTodo(false) } > Cancel </button>
          <button className='bg-green-600 tracking-wider w-fit rounded-lg px-3 py-1 mt-2
           hover:bg-green-800' onClick={sendData}> Create </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTodo;