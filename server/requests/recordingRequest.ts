import { IUpdateToken } from "./types";
import {access_token} from '../config/server.config.json';
import {Request,Response} from "express";
import { IUser } from "../middlewares/types";
import confirmRefreshToken from "../middlewares/confirmRefreshToken";
import { generateAccessToken,generateRefreshToken } from "../utils/generates";
import { v4 } from "uuid";
import { db } from "../database";


class RecordingRequest implements IUpdateToken{
   public async update(req:Request, res:Response):Promise<void>{
    if(req.body?.refreshToken){
        try{
            const user:IUser = await confirmRefreshToken(req.body.refreshToken);
            const accessToken:string|undefined = generateAccessToken(user.id,user.login)
            const refreshId:string= v4()
            const refreshToken:string = generateRefreshToken(refreshId)
            try{
                await db.query(`UPDATE users SET refresh_id=$1 WHERE login=$2`,[
                    refreshId,
                    user.login
                ])
                res.status(200).json({message:"Токен обновлен",
                accessToken,
                refreshToken, 
                access_expiresIn:access_token.time,
                access_createDate:new Date().getTime()})
            }catch(e){
                res.status(500).json({message:'Ошибка сервера'})
            }
        
        }catch(e){
            res.status(403).json({message:'токен не алё'})
        }
    }

   }
}



export default new RecordingRequest()