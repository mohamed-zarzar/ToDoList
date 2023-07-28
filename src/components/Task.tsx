import { useState } from "react"
import { useAppSelector } from "../rtk/hook"
import { TaskType } from "../../type/type"
import { croosIcon } from "../images/indext"
import {deleteTask,ChangeTaskStatus} from "../rtk/features/tasksSlice"
import { useAppDispatch } from "../rtk/hook"

const Task = ({title,completed,id}:TaskType) => {
    const dispatch = useAppDispatch();
    const [isCompleted, setIsCompleted] = useState<boolean>(completed)
    const mode = useAppSelector(state => state.mode);
    const handelClickIsCompleted = () => {
        setIsCompleted(!isCompleted);
        dispatch(ChangeTaskStatus(id));
    }
    const handeldelet = () => {
        dispatch(deleteTask(id));
    }
    return (
        <div className={`h-10 flex justify-between items-center bg-white p-2  border-solid ${mode.name === "light" ? "border-gray-300" : "border-gray-700"}`}
        style={{borderBottomWidth:"1px",backgroundColor:`${mode.taskBackgroundColor}`}}>
            <div className="flex items-center">
                <button className={`flex justify-center items-center text-xs text-white w-4 h-4 mx-2 rounded-full ${isCompleted ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" : "border-solid"} ${mode.name === "light" ? "border-gray-300" : "border-gray-700"}`}
                style={{borderWidth:"1px"}}
                onClick={handelClickIsCompleted}>{isCompleted ? "✓" : ""}</button>
                <div style={{color:`${isCompleted ? "gray" : mode.textColor}`,opacity:`${isCompleted ? "0.4" : ""}`}} className='text-sm' >
                    {title}
                </div>
            </div>
            <button onClick={handeldelet} className="hover:-scale-125">
                <img src={croosIcon} alt=""  style={{width:"8px"}}/>
            </button>
        </div>
    )
}

export default Task