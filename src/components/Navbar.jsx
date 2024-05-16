import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import CreateTodo from './CreateTodo';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const {id,setCreateTodo,createTodo,name} = useContext(TodoContext);
  return (
    <div className='min-w-full py-4 bg-slate-500 text-white flex justify-around'>
      <Link className='text-xl font-semibold tracking-wide cursor-pointer' to={'/'}> JP Todo </Link>
      <div className='flex gap-10 text-xl font-bold'>
        <NavLink className='tracking-wider cursor-pointer' to={'/'}> Home </NavLink>
        <p className='tracking-wider cursor-pointer' onClick={()=>{setCreateTodo(true)}}> Create Todo </p>
        
        {
          id ? 
            <p className='tracking-wider cursor-pointer' onClick={()=>{document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; window.location.reload();}}>  {name} </p> : 
            <NavLink className='tracking-wider cursor-pointer' to={'/login'} >  Login </NavLink>
        }
        {
          createTodo ? <CreateTodo/> : null
        }
      </div>
    </div>
  )
}

export default Navbar;