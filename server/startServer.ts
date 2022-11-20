import { Express } from "express";
import {IDatabase} from 'pg-promise';
import serverConfig from './config/server.config.json';

const host:string = serverConfig.host
const port:string = process.env.PORT || serverConfig.port.toString()

export const startServer = async (app:Express, db:IDatabase<{}>)=>{
    app.listen(+port,host, async ()=>{
        try{
            await db.connect()
            console.log('connected database!!!')
        }catch(e){
            console.log('not connected database')
        }
        console.log('server listen on port ' +port)
    })
}