import { createContext, useState } from "react";

export const TodoContext = createContext();

function TodoContextProvider(props){
  const children = props.children;

  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState([]);
  const [createTodo, setCreateTodo] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState('');
  

  const id = window.localStorage.getItem("token") ? window.localStorage.getItem("token") : null;

  const value = {
    loading, setLoading,
    todo, setTodo,
    createTodo,setCreateTodo,
    name,setName,
    email,setEmail,
    password,setPassword, id
  }

  return <TodoContext.Provider value={value} >
    {children}
  </TodoContext.Provider>

  // document.cookie.
}

export default TodoContextProvider;