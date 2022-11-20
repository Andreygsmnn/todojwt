import React from 'react';
import styles from './Button.module.scss';
import {IDeleteAll,IAdd} from '../../utils/tasks_ut'
import { AppDispatch } from '../../store/store';


interface IProps {
  color: string,
  text: string,
  onClick: IDeleteAll|IAdd,
  dispatch:AppDispatch
}

const Button: React.FC<IProps> = ({ color, text, onClick,dispatch }) => {
  
  return (
    <button className={styles.button} 
    style={{ borderColor: color, 
      boxShadow: `2px 3px 8px ${color}`, 
      color }}
      
    onClick={()=>onClick(dispatch) }>
      {text}
    </button>
  )
}

export default Button;