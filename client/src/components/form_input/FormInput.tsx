import React from 'react';
import { changeLogin, changePassword } from '../../store/slices/authorization_slice/authorization_slice';
import { Dispatch } from '../../store/store';
import styles from './FormInput.module.scss';

interface IProps{
  value: string;
  type: string;
}

const FormInput: React.FC<IProps> = ({value,type}) => {
  const dispatch = Dispatch()
  return (
    <div className={styles.wrapper}>
    <input className={styles.input} 
    type={type} 
    value={value}
    onChange={e=>type==='text' ? 
    dispatch(changeLogin(e.target.value))
    :
    dispatch(changePassword(e.target.value))}
    placeholder={type==='text' ? 'Логин': 'Пароль'}/>
    </div>
  )
}

export default FormInput;