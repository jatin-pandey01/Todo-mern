import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import CreateTodo from './CreateTodo';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {id,setCreateTodo,createTodo,name} = useContext(TodoContext);
  const navigate = useNavigate();
  return (
    <div className='min-w-full py-4 bg-slate-500 text-white flex justify-around'>
      <Link className='text-xl font-semibold tracking-wide cursor-pointer' to={'/'}> {id ? `Hello, ${name}`:'JP Todo'} </Link>
      <div className='flex gap-10 text-xl font-bold'>
        <NavLink className='tracking-wider cursor-pointer' to={'/'}> Home </NavLink>
        <p className='tracking-wider cursor-pointer' onClick={()=>{console.log(id); id ? alert('Please login for creating todo.') : setCreateTodo(true)}}> Create Todo </p>

        {
          id ? 
            <p className='tracking-wider cursor-pointer' onClick={()=>{document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; window.location.reload();}}>  Logout </p> : 
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