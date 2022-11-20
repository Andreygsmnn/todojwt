


export interface IGenerateAccessToken{
    (id:number,login:string):string|undefined
   
}
export interface IGenerateRefreshToken{
    (id:string):string
   
}

export interface IPayloadToken{
    id:number,
    login:string
}