import { AppDispatch } from "../store/store";
import { addTask,addTaskAsync,deleteTasks,updateTask,
    updateTaskAsync, deleteTaskId,
     deleteTaskAsyncId,
     deleteTasksAsync } from "../store/slices/tasks_slice/tasks_slice"

export interface IAdd{
    (dispatch:AppDispatch):void
}
export interface IUpdate{
    (id:number,dispatch:AppDispatch):void
}
export interface IDeleteId{
    (id:number,dispatch:AppDispatch):void
}
export interface IDeleteAll{
    (dispatch:AppDispatch):void
}


export const add:IAdd =(dispatch)=>{
    dispatch(addTask())
    dispatch(addTaskAsync())
}
export const update:IUpdate=(id,dispatch)=>{
    dispatch(updateTask(id))
    dispatch(updateTaskAsync(id))
}
export const deleteAll:IDeleteAll=(dispatch)=>{
    dispatch(deleteTasks())
    dispatch(deleteTasksAsync())
}
export const deleteId:IDeleteId=(id,dispatch)=>{
    dispatch(deleteTaskId(id))
    dispatch(deleteTaskAsyncId(id))
}