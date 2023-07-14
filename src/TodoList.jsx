import List from '@mui/material/List';
import Todoitem from "./Todoitem"
import TodoForm from "./TodoForm"
import {Box,Typography} from '@mui/material'
import {useState,useEffect} from "react";
const getInitialData=()=>{
const data=JSON.parse(localStorage.getItem("todos"));
if(!data) return [];
else return data;
}

export default function TodoList(){
    const [todos,setTodos]=useState(getInitialData);
    useEffect(()=>{
   localStorage.setItem("todos",JSON.stringify(todos));
    },[todos])
    const removeTodo=(id)=>{
        setTodos((prevTodos)=>{
            return prevTodos.filter((t)=> t.id!==id);
        });
    };
    const toggleTodo=(id)=>{
setTodos((prevTodos)=>{
return prevTodos.map((todo)=>{
    if(todo.id===id){
        return{...todo,completed:!todo.completed}
    }
    else{
        return todo;
    }
});
});
    };
    const addTodo=(text)=>{
        setTodos((prevTodos)=>{
            return [...prevTodos,{text:text,id:crypto.randomUUID(),completed:false}]
        })
    }
    return(
        <Box sx={{
            display:"flex",
            justifyContent:'center',
            flexDirection:"column",
            alignItems:"center",
            m:5,
        }}>
            <Typography variant="h5" component="h4" sx={{ flexGrow: 1 }}>
                You can add the topics and also update it after completion
            </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todos.map((todo)=>{
              return  <Todoitem todo={todo} key={todo.id} remove={removeTodo} toggle={()=>{toggleTodo(todo.id)}}/>
            })}
           <TodoForm addTodo={addTodo}/>
        </List>
        </Box>

    );
}


