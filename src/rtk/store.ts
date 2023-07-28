import { configureStore } from '@reduxjs/toolkit';
import modeSlice from './features/modeSlice';
import tasksSlice from "./features/tasksSlice"


const store = configureStore({
    reducer: {
      mode:modeSlice,
      tasks:tasksSlice,
    }
  })










  export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch