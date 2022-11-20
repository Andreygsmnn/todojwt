import React from 'react';
import Button from '../../components/button/Button';
import Title from '../../components/title/Title';
import { changeTitleTask } from '../../store/slices/tasks_slice/tasks_slice';
import { Dispatch, Selector } from '../../store/store';
import { add, deleteAll } from '../../utils/tasks_ut';
import styles from './TaskPage.module.scss';
import TasksContainer from './TasksContainer';

const TaskPage = () => {
  const dispatch=Dispatch()
  const {titleInput} = Selector(state=>state.tasks)
  return (
    <>
      <div className={styles.title}><Title /></div>

      <input className={styles.addInput}
       type="text" 
       placeholder='Название задачи'
       value={titleInput}
       onChange={e=>dispatch(changeTitleTask(e.target.value))}
       />

      <div className={styles.control}>
        <Button color='red' text='Очистить' onClick={deleteAll} dispatch={dispatch} />
        <Button color='black' text='Добавить' onClick={add} dispatch={dispatch} /> 
      </div>
      <TasksContainer/>
    </>
  )
}

export default TaskPage