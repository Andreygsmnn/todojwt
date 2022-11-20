
import { configureStore } from "@reduxjs/toolkit";
import authorizationSlice from "./slices/authorization_slice/authorization_slice";
import { useDispatch, TypedUseSelectorHook,useSelector } from "react-redux";
import tasksSlice from "./slices/tasks_slice/tasks_slice";



export const store = configureStore({
    reducer:{
        authorization: authorizationSlice.reducer,
        tasks: tasksSlice.reducer
    },
    devTools:true
   
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const Selector:TypedUseSelectorHook<RootState> = useSelector
export const Dispatch=()=>useDispatch<AppDispatch>()
