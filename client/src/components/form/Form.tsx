import React from 'react';
import { formToggle, IForm } from '../../store/slices/authorization_slice/types';
import styles from './Form.module.scss';
import FormInput from '../form_input/FormInput';
import FormButton from '../form_button/FormButton';
import { onSubmit, onToggleForm } from '../../utils/on_submit';
import { Dispatch, Selector } from '../../store/store';



interface IProps {
  typeForm: IForm,
  login: string,
  password: string,
  error: string
}

const Form: React.FC<IProps> = ({ typeForm, login, password, error }) => {
  const dispatch = Dispatch()
  const auth:boolean = Selector(state => state.authorization.isAuth)

  return (
    <form className={styles.form}>
      {typeForm === formToggle.EXIT || auth
        ?
        <FormButton onClick={(e) =>  onSubmit(formToggle.EXIT, dispatch, e)} text='Выйти'/>
        :
        typeForm===formToggle.SIGN_UP
        ?
      <>
      {error?<p className={styles.error}>{error}</p>:null}
      <h2 className={styles.title}>Регистрация</h2>
      <FormInput value={login} type='text' />
      <FormInput value={password} type='password' />
      <FormButton onClick={(e) =>  onSubmit(formToggle.SIGN_UP, dispatch, e)} text='Зарегистрироваться' />
      <button className={styles.button} onClick={e => onToggleForm(formToggle.SIGN_IN,dispatch,e)}>Войти?</button>
      </>
      :
      <>
      {error?<p className={styles.error}>{error}</p>:null}
      <h2 className={styles.title}>Вход</h2>
      <FormInput value={login} type='text' />
      <FormInput value={password} type='password' />
      <FormButton onClick={(e) =>  onSubmit(formToggle.SIGN_IN, dispatch, e)} text='Войти' />
      <button className={styles.button} onClick={e => onToggleForm(formToggle.SIGN_UP,dispatch,e)}>Зарегистрироваться?</button>
      </>}
    </form>
  )
}

export default Form;