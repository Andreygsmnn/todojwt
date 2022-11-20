import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IRefreshTokenBody, IUserAuthBody } from "../../../api/requests/auth/types";
import { RootState } from "../../store";
import { formToggle, IAuthorizationState, IForm } from "./types";
import AuthRequests from '../../../api/requests/auth/auth';
import { ErrorResponse } from "@remix-run/router";

export const asyncSignIn = createAsyncThunk(
    'authorization/asyncSignIn',
    async (_, thunkAPI) => {

        const state = (thunkAPI.getState() as RootState).authorization;
        if (!state.login || !state.password) {
           return thunkAPI.rejectWithValue('Поля не могут быть пустыми')
        } else {
            try {
                const body: IUserAuthBody = {
                    login: state.login,
                    password: state.password
                }
                const { data } = await AuthRequests.auth(body)
                return data
            } catch (e:any) {
            return  thunkAPI.rejectWithValue(e.response.data.message)
            }
        }
    }
)
export const asyncSignUp = createAsyncThunk(
    'authorization/asyncSignUp',
    async (_, thunkAPI) => {
        const state = (thunkAPI.getState() as RootState).authorization
        if (!state.login && !state.password) {
            return thunkAPI.rejectWithValue('Поля не должны быть пустыми')
        } else {
            try {
                const body: IUserAuthBody = {
                    login: state.login,
                    password: state.password
                }
                const { data } = await AuthRequests.register(body)
                return data
            } catch (e: any) {
                return thunkAPI.rejectWithValue(e.response.data.message)
            }

        }
    }
)
export const asyncUpdateRefreshToken = createAsyncThunk(
    'authorization/asyncUpdateRefreshToken',
    async (_, thunkAPI) => {

        try {
            const body: IRefreshTokenBody = {
                refreshToken: JSON.parse(localStorage.getItem('refresh_token') || '')
            }
            const { data } = await AuthRequests.refreshToken(body)
            return data
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }

    }
)

const initialState: IAuthorizationState = {
    createDateAccessToken: 0,
    timeAccessToken: 0,
    typeForm: formToggle.SIGN_IN,
    login: '',
    password: '',
    error: '',
    isAuth: false
}

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        changeCreateDateAccessToken: (state, action: PayloadAction<number>) => {
            state.createDateAccessToken = action.payload
        },
        changeTimeAccessToken: (state, action: PayloadAction<number>) => {
            state.timeAccessToken = action.payload
        },
        changeLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload
        },
        changePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        toggle: (state, action: PayloadAction<IForm>) => {
            state.typeForm = action.payload
        },
        exit: state => {
            localStorage.clear()
            state.isAuth = false
            state.typeForm = formToggle.SIGN_IN
        },
        toggleAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        }

    },
    extraReducers: {
        [asyncSignUp.fulfilled.type]: (state, action: PayloadAction<any>) => {
            localStorage.setItem('access_token', JSON.stringify(action.payload.accessToken))
            localStorage.setItem('refresh_token', JSON.stringify(action.payload.refreshToken))
            localStorage.setItem('time_access_token', JSON.stringify(action.payload.access_expiresIn))
            localStorage.setItem('create_data_access_token', JSON.stringify(action.payload.access_createDate))
            console.log(action.payload)
            state.login = ''
            state.password = ''
            state.error = ''
            state.isAuth = true
            state.typeForm = formToggle.EXIT
        },
        [asyncSignUp.rejected.type]: (state, action: PayloadAction<any>) => {
            state.login = ''
            state.password = ''
            state.error = action.payload
            state.isAuth = false
            state.typeForm = formToggle.SIGN_UP
        },

        [asyncSignIn.fulfilled.type]: (state, action: PayloadAction<any>) => {
            localStorage.setItem('access_token', JSON.stringify(action.payload.accessToken))
            localStorage.setItem('refresh_token', JSON.stringify(action.payload.refreshToken))
            localStorage.setItem('time_access_token', JSON.stringify(action.payload.access_expiresIn))
            localStorage.setItem('create_date_access_token', JSON.stringify(action.payload.access_createDate))
            console.log(action.payload)
            state.login = ''
            state.password = ''
            state.error = ''
            state.isAuth = true
            state.typeForm = formToggle.EXIT
        },
        [asyncUpdateRefreshToken.fulfilled.type]: (state, action: PayloadAction<any>) => {
            localStorage.setItem('access_token', JSON.stringify(action.payload.accessToken))
            localStorage.setItem('refresh_token', JSON.stringify(action.payload.refreshToken))
            localStorage.setItem('time_access_token', JSON.stringify(action.payload.access_expiresIn))
            localStorage.setItem('create_date_access_token', JSON.stringify(action.payload.access_createDate))
            console.log(action.payload)
            state.login = ''
            state.password = ''
            state.error = ''
            state.isAuth = true
            
        },
        [asyncUpdateRefreshToken.rejected.type]: (state, action: PayloadAction<any>) => {
            state.login = ''
            state.password = ''
            state.error = action.payload
            state.isAuth = false
            state.typeForm = formToggle.SIGN_IN
        },
        [asyncSignIn.rejected.type]: (state, action: PayloadAction<any>) => {

            state.login = ''
            state.password = ''
            state.error = action.payload
            state.isAuth = false
            state.typeForm = formToggle.SIGN_IN
        }
    }
})

export const { changeLogin, 
    changePassword, 
    exit, 
    toggle, 
    toggleAuth,
    changeCreateDateAccessToken,
    changeTimeAccessToken } = authorizationSlice.actions
export default authorizationSlice