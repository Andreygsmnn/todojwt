import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import TaskPage from './pages/task/TaskPage';
import AuthContainer from './components/auth/AuthContainer';
import { Selector, Dispatch } from './store/store';
import { changeCreateDateAccessToken, changeTimeAccessToken, toggleAuth } from './store/slices/authorization_slice/authorization_slice';
import { updateTimerAccessToken } from './utils/updateTimerAccessToken';



function App() {
  const dispatch = Dispatch()
  const auth: boolean = Selector(state => state.authorization.isAuth)
  const { createDateAccessToken, timeAccessToken } = Selector(state => state.authorization)

  useEffect(() => {

    setInterval(() => {
      if (!localStorage.getItem('access_token')) {
        dispatch(toggleAuth(false))
      } else {
        dispatch(toggleAuth(true))
      }

      const createDateAccessToken = localStorage.getItem('create_date_access_token')
      const timeAccessToken = localStorage.getItem('time_access_token')
      
      if (createDateAccessToken && timeAccessToken) {
        dispatch(changeTimeAccessToken(+timeAccessToken))
        dispatch(changeCreateDateAccessToken(+createDateAccessToken))
      } else {
        dispatch(changeTimeAccessToken(0))
        dispatch(changeCreateDateAccessToken(0))
      }
    }, 500)

  }, [])

  useEffect(() => {
    updateTimerAccessToken(timeAccessToken,createDateAccessToken,dispatch)

  }, [createDateAccessToken])


  return (
    <div className="app">
      <div className="aside">
        <AuthContainer />
      </div>
      <div className="content">
        <Routes>
          <Route path='/' element={auth ? <TaskPage /> : <MainPage />}></Route>
          <Route path='/tasks' element={auth ? <TaskPage /> : <Navigate to='/' />}></Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
