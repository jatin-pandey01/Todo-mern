import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

function TodoContextProvider(props){
  const children = props.children;

  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState([]);
  const [createTodo, setCreateTodo] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState('');
  const [id,setId] = useState('');
  const {user,setUser} = useState({});

  useEffect(async()=>{
    // console.log("hello");
    console.log(document.cookie);
    const apiCall = async()=>{
      try {
        const res = await axios.get('https://todo-api-kax0.onrender.com/api/v1/auth/user-auth',{
          headers:{Authorization:`${document.cookie.split(';')[0]}`}
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
    apiCall();
  },[]);

  const value = {
    loading, setLoading,
    todo, setTodo,
    createTodo,setCreateTodo,
    name,setName,
    email,setEmail,
    password,setPassword,
    id,setId,
    user,setUser
  }

  return <TodoContext.Provider value={value} >
    {children}
  </TodoContext.Provider>

  // document.cookie.
}

export default TodoContextProvider;