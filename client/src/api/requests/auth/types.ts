
export interface IUserAuthBody{
    login:string,
    password:string
}

export interface IRefreshTokenBody{
    refreshToken:string
}
export interface IAuthRequests{
    auth(body:IUserAuthBody):Promise<any>
    register(body:IUserAuthBody):Promise<any>
    refreshToken(body:IRefreshTokenBody):Promise<any>
    
}