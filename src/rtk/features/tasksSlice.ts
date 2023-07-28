import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskType } from '../../../type/type';

type arrOfTasks = TaskType[];

const initialState : arrOfTasks =[];



const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        getTasksFromLocalstorage: (state,action: PayloadAction<TaskType[]>) => {
            return action.payload;
        },
        addTask: (state, action: PayloadAction<TaskType>) => {
            window.localStorage.setItem("tasks",JSON.stringify(state));
            state.push(action.payload);
        },
        ChangeTaskStatus: (state, action: PayloadAction<number>) => {
            const find  = state.find((task)=> task.id === action.payload);
            if(find) {
                find.completed = !find.completed;
            }
            window.localStorage.setItem("tasks",JSON.stringify(state));
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            const findTask = state.find((task)=> action.payload === task.id);
            let newTaskList : TaskType[] = [];
            if(findTask) {
                newTaskList = state.filter((task)=> findTask !== task);
                window.localStorage.setItem("tasks",JSON.stringify(newTaskList));
                return newTaskList;
            }
        },
        clearAllComletedTasks: (state) => {
            const newTaskList = state.filter((task) => !task.completed);
            window.localStorage.setItem("tasks",JSON.stringify(newTaskList));
            return newTaskList;
        },
    },
}
)

export default tasksSlice.reducer;
export const { addTask,deleteTask,clearAllComletedTasks,ChangeTaskStatus,getTasksFromLocalstorage} = tasksSlice.actions;