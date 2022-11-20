import React from 'react';
import { asyncSignIn, asyncSignUp,exit, toggle } from "../store/slices/authorization_slice/authorization_slice";
import { formToggle,IForm } from "../store/slices/authorization_slice/types";
import { AppDispatch } from "../store/store";

export const onSubmit=(type: IForm,dispatch:AppDispatch,e:React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    if(type===formToggle.SIGN_UP){
        dispatch(asyncSignUp())
       
    }else if(type===formToggle.SIGN_IN){
       dispatch(asyncSignIn())
      
    }else if(type===formToggle.EXIT){
        dispatch(exit())
        
    }
}

export const onToggleForm=(type:IForm,dispatch:AppDispatch, e:React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    dispatch(toggle(type))
}