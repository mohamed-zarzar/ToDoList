import './App.css';
import { useAppSelector,useAppDispatch } from "./rtk/hook";
import Task from './components/Task';
import {  useEffect, useState } from 'react';
import { addTask,clearAllComletedTasks,getTasksFromLocalstorage } from "./rtk/features/tasksSlice";
import { changeMode } from "./rtk/features/modeSlice";


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    try {
      const data = JSON.parse(window.localStorage.getItem("tasks") || "");
      dispatch(getTasksFromLocalstorage(data));
    } catch {}
  },[])
  const mode = useAppSelector((state) => state.mode);
  const allTasks = useAppSelector((state) => state.tasks);
  const comletedTaskLength = allTasks.filter((task) => task.completed).length;
  const [addedTask, setAddedTask] = useState<string>('');
  const [isCompleted,setIsCompleted] = useState<boolean>(false);
  const [taskShowStatus,setTaskShouStatus] = useState<"all" | "active" | "completed">("all");
  const handelChange = (task:string) => {
    setAddedTask(task);
  }
  const handelClickAdd = () => {
    if(addedTask) {
      dispatch(addTask({
        id: Date.now(),
        title:addedTask,
        completed:isCompleted,
      }))
      setAddedTask('');
      setIsCompleted(false);
    }
  }
  const handelClickIsCompleted = () => {
    setIsCompleted(!isCompleted);
  }
  document.body.style.backgroundColor = mode.mainBackgroundColor;
  return (
    <div className="App w-full relative">
      <div 
      className={`bg-cover w-full h-52 ${mode.name}`}/>
      <div className='absolute top-16 left-1/2 -translate-x-1/2 flex flex-col'>
        <div className='flex justify-between mb-2'>
          <h1 className='text-white font-semibold text-xl'>TO DO LIST</h1>
          <button onClick={()=>{dispatch(changeMode())}}>
            <img src={mode.icon} alt="" className='w-6'/>
          </button>
        </div>
        <div className='p-2 flex items-center h-10 rounded-md text-sm'
        style={{color:`${mode.textColor}`,backgroundColor:`${mode.taskBackgroundColor}`}}>
<button className={`flex justify-center items-center text-xs text-white w-4 h-4 mx-2 rounded-full ${isCompleted ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" : "border-solid"} ${mode.name === "light" ? "border-gray-300" : "border-gray-700"}`}
                style={{borderWidth:"1px"}}
                onClick={handelClickIsCompleted}>{isCompleted ? "✓" : ""}</button>
          <input type="text" 
          value={addedTask}
          className='outline-0 bg-transparent text-sm'
          style={{color:`${isCompleted ? "gray" : mode.textColor}`,opacity:`${isCompleted ? "0.4" : ""}`}}
          onChange={(e)=>handelChange(e.target.value)}/>
          <button onClick={handelClickAdd}  className={`ml-auto hover:scale-125 ${mode.name === "light" ? "text-black" : "text-gray-500"}`} >+</button>
        </div>
        <div className="w-64 md:w-128 flex flex-col my-4 shadow-2xl rounded-md overflow-hidden" 
        style={{backgroundColor:`${mode.taskBackgroundColor}`}}>
          {allTasks.map((task) => {
            if(taskShowStatus === "all") {
              return (
                <Task {...task} key={task.id}/>
              );
            }
            if(taskShowStatus === "active") {
              if(task.completed) return <></>;
              return (
                <Task {...task} key={task.id}/>
              );
            }
            if(taskShowStatus === "completed") {
              if(!task.completed) return <></>;
              return (
                <Task {...task} key={task.id}/>
              );
            }
          })}
          <div className='h-10 flex justify-evenly items-center w-full'
          style={{fontSize:"8px"}}>
            <div className='text-gray-500'>{allTasks.length - comletedTaskLength} item left</div>
            <div className='flex text-gray-500'>
              <div className={`hover:scale-105 px-1 ${taskShowStatus === "all" ? "text-blue-400" : "text-gray-500"}`}>
                <button onClick={()=>{setTaskShouStatus("all")}}>All</button>
              </div>
              <div className={`hover:scale-105 px-1 ${taskShowStatus === "active" ? "text-blue-400" : "text-gray-500"}`}>
                <button onClick={()=>{setTaskShouStatus("active")}}>Active</button>
              </div>
              <div className={`hover:scale-105 px-1 ${taskShowStatus === "completed" ? "text-blue-400" : "text-gray-500"}`}>
                <button onClick={()=>{setTaskShouStatus("completed")}}>Completed</button>
              </div>
            </div>
            <div className='text-gray-500 hover:scale-105'>
              <button onClick={()=>{
                dispatch(clearAllComletedTasks());
              }}>
                Clear Completed
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}





export default App;








