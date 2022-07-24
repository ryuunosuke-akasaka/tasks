import Header from "./component/Header" 
import TaskT from "./component/TaskT"
import { useState, useEffect } from "react"
import AddTask from "./component/AddTask"

const App = () =>{
  const [showAddTask, setShowAddTask] = useState(false)
   const [task, setTask] = useState([])

   useEffect(()=>{
     const getTasks = async () => {
       const tasksFromServer = await fetchTasks()
       setTask(tasksFromServer)
     }

     getTasks()
   }, [])

   //fetch tasks
   const fetchTasks = async() => {
       const res = await fetch("http://localhost:5000/task")
       const data  = await res.json()

       console.log(data)
       return data
    }

    const fetchTask = async(id) => {
       const res = await fetch(`http://localhost:5000/task/${id}`)
       const data  = await res.json()

       console.log(data)
       return data
    }

   //Delete Task
   const deleteTask = async (id) =>{
     await fetch(`http://localhost:5000/task/${id}`,{
       method:'DELETE',
     })
     setTask(task.filter((task) => task.id !== id))
   }
   //toggle reminder

   const toggleReminder = async(id) =>{
     const tasktoToggle = await fetchTask(id)
     const updTask = {...tasktoToggle,
      reminder: !tasktoToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/task/${id}`,{
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
  

     setTask(
       task.map((task) => 
       task.id === id? {...task, reminder:data.reminder}: task
      )
     )
   }

   //Add Task
   const addTask = async (tasks) =>{
     const res = await fetch('http://localhost:5000/task',{
       method:'POST',
       headers:{
         'Content-type':'application/json'
       },
       body:JSON.stringify(tasks)
     })

     const data = await res.json()
     setTask([...task, data])

    //  const id = Math.floor(Math.random()*10000)+1
    //  const newTask = {id, ...task}
    //  setTask([...task, newTask])
   }

  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {task.length>0 ? (
      <TaskT task = {task} 
      onToggle = {toggleReminder}
      onDelete= {deleteTask}/>)
      :('No Tasks to show')}
    </div>
  )
}

export default App