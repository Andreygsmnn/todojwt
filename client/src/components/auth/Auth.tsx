import React from 'react';
import { IForm } from '../../store/slices/authorization_slice/types';
import Form from '../form/Form';
import styles from './Auth.module.scss';

interface IProps{
  typeForm:IForm,
  login:string,
  password:string,
  error:string
}
const Auth:React.FC<IProps> = ({typeForm,login,password,error}) => {
  return (
    <div className={styles.aside}>
      <Form typeForm={typeForm} 
      login={login} 
      password={password}
       error={error} />
    </div>
  )
}

export default Auth;