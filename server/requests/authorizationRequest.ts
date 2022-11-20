import {db} from '../database/index';
import {access_token} from '../config/server.config.json'
import { Request,Response } from 'express';
import {IAuthorizationRequest} from './types';
import {compareSync, hashSync} from 'bcrypt';
import {v4} from 'uuid'
import { generateAccessToken,generateRefreshToken } from '../utils/generates';

class AuthorizationRequest implements IAuthorizationRequest{
    public async authorization(req:Request, res:Response){
        const {login,password}=req.body
        if(login&&password){
    
            try{
              const user = await db.query(`SELECT * FROM users WHERE login=$1`,[
                 login,
              ])
                if(compareSync(password,user[0].password)&&user){
                    const accessToken = generateAccessToken(user[0].id, login)
                    const refreshToken = generateRefreshToken(user[0].refresh_id)
      
                    res.status(200).json({message:'Авторизация успешна', 
                    refreshToken, 
                    accessToken,
                    access_expiresIn:access_token.time,
                    access_createDate:new Date().getTime()
                })
                }else{
                    res.status(400).json({message:'Неверный логин или пароль'})
                }
              
            }catch(e){
             console.log(e)
                 res.status(500).json({message:'Пользователя с таким логином не существует'})
            }
        }else{
         res.status(400).json({message:'Нет данных'})
        }
    }


    public async registration(req:Request, res:Response){
           const {login,password}=req.body
           if(login&&password){
               const refreshId:string = v4()
               const hashPassword:string = hashSync(password,10)
               try{
                 const user = await db.query(`INSERT INTO users (login, password, refresh_id ) VALUES ($1,$2,$3) returning *`,[
                    login,
                    hashPassword,
                    refreshId
                 ])

                 const accessToken = generateAccessToken(user[0].id, login)
                 const refreshToken = generateRefreshToken(user[0].refresh_id)

                 res.status(200).json({message:'Пользователь добавлен', 
                 refreshToken, 
                 accessToken,
                 access_expiresIn:access_token.time,
                 access_createDate:new Date().getTime()
                })
               }catch(e){
                console.log(e)
                    res.status(500).json({message:'Такое имя логина уже занято'})
               }
           }else{
            res.status(400).json({message:'Не хватает данных'})
           }
    }

}

export default new AuthorizationRequest();