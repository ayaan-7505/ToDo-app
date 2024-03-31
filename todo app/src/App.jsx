import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";



function App() {

const [todo, settodo] = useState("")
const [todos, settodos] = useState([])
const [showfinished, setshowfinished] = useState(true)

useEffect(() => {
  let todostring=localStorage.getItem("todos")
  if(todostring)
  {
    let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
  }
}, [])


const savetols=()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}

const togglefinish=()=>{
  setshowfinished(!showfinished)
}

const handleDelete=(e,id)=>{
  let Newtodos=todos.filter(item=>{
    return item.id!==id
  })
  settodos(Newtodos)
  savetols()

}

const handleEdit=(e,id)=>{
  let t=todos.filter(i=>i.id===id)
  settodo(t[0].todo)
  let Newtodos=todos.filter(item=>{
    return item.id!==id
  })
  settodos(Newtodos)
  savetols()
  
}

 const handleAdd=()=>{
  settodos([...todos,{id:uuidv4(), todo , isCompleted:false}])
  settodo("")
  savetols()
}

const handleChange=(e)=>{
  settodo(e.target.value)
  
}

const handleCheckbox=(e) =>{
  let id=e.target.name
  let index=todos.findIndex(item=>{
    return item.id===id
  })
  let Newtodos=[...todos]
  Newtodos[index].isCompleted=!Newtodos[index].isCompleted
  settodos(Newtodos)
  savetols()
}


  return (
    <>
    <Navbar/> 
    <div className="container mx-auto rounded-xl p-5 my-5 bg-violet-200 min-h-[80vh] w-1/2">
      <h1 className='text-center font-bold'>MyTask-Manage your todos at one place</h1>
      <div className='addtodo my-5'>
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-3/4 '/>
        <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-800 rounded-md mx-3 p-3 py-1 text-white hover:bg-violet-950 text-sm font-bold'>SAVE</button>
      </div>
        <input type="checkbox" checked={showfinished} onChange={togglefinish} />ShowFinished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        {todos.length===0 && <div className='m-5'>No Todos to display</div>}
        {todos.map(item=>{
         return (showfinished || !item.isCompleted) && <div key={item.id} className="flex todo w-1/4 justify-between my-3">
          <div className="flex gap-5">
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}/>
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
        <div className="buttons flex h-full">
          <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 rounded-md mx-1 p-3 py-1 text-white hover:bg-violet-950 text-sm font-bold'><BiSolidEdit /></button>
          <button onClick={(e)=>(handleDelete(e, item.id))} className='bg-violet-800 rounded-md mx-1 p-3 py-1 text-white hover:bg-violet-950 text-sm font-bold'><RiDeleteBinFill /></button>
        </div>
        </div>
      })}

    </div>
    </> 
  )
}

export default App
