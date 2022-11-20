import { Request } from "express"
export interface IRequestUser extends Request{
    user?:{
        id:number,
        login:string,
        password:string,
        refresh_token:string
    }
}

export interface IRefreshTokenPayload{
    id:string
}

export interface IUser{
    id:number,
    login:string,
    password:string,
    refresh_id:string
}