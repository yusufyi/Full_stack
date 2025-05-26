import React, { useEffect, useState } from 'react'

export const TaskList = () => {
  const [task,setTasks] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    fetch("http://localhost:8000/api/tasks/")
    .then((res)=>res.json())
    .then((data)=>{
        setTasks(data)
        setLoading(false)
    })
    .catch((err)=>console.log('Fetch Task Loading Errro',err));

  },[])
    if(loading) 
    return <div> Loadiing</div>

  return (
    <div>
        <h1>TaskList</h1>
        <ul>
            {task.map(t => (
                <li key={t.id}>
                               {t.title} – {t.completed ? "✅ Done" : "❌ Not Done"}

                </li> 
            ))}
        </ul>

    </div>
  )
}
