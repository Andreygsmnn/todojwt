import pg from 'pg-promise';
import dbConfig from '../config/db.config.json';
import { IConnectionDB } from '../config/types';


const connection:IConnectionDB = {
    user:dbConfig.user,
    password:dbConfig.password,
    port:dbConfig.port,
    host:dbConfig.host,
    database:dbConfig.database
}

export const db:pg.IDatabase<{}>=pg()(connection)