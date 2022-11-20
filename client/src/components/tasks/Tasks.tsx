import React,{useEffect} from 'react';
import Task from './Task';
import styles from './Tasks.module.scss';
import {ITask} from '../../store/slices/tasks_slice/types';
import { Dispatch } from '../../store/store';
import { getTaskAsync } from '../../store/slices/tasks_slice/tasks_slice';


interface IProps{
    isGetTasksRequest:boolean,
    tasks:ITask[]
}

const Tasks:React.FC<IProps> = ({isGetTasksRequest,tasks}) => {
    const dispatch= Dispatch()
    useEffect(()=>{
      if(!isGetTasksRequest){
          dispatch(getTaskAsync())
      }
    },[])
    return (
        <ul className={styles.list}>
            {tasks.map(task => <Task key={task.id} task={task} />)}
        </ul>
    )
}

export default Tasks