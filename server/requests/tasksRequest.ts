import { db } from '../database/index';
import {  Response } from 'express';
import { IGetTask, ITasksRequest } from './types';
import { IRequestUser } from '../middlewares/types'
import { isConstructorDeclaration } from 'typescript';

class TasksRequest implements ITasksRequest {

    public async addTask(req: IRequestUser, res: Response): Promise<void> {
        if (req.body.title && typeof req.body.done==='boolean' && req.user?.id) {
            try {
                await db.query(`INSERT INTO tasks (title,done,user_id) VALUES ($1,$2,$3)`, [
                    req.body.title,
                    req.body.done,
                    req.user.id
                ])
                res.status(200).json({ message: 'Задача добавлена' })
            } catch (e) {
                res.status(500).json({ message: 'Ошибка сервера' })
            }
        } else {
            res.status(400).json({ message: 'Нет данных' })
        }
    }
    public async deleteTaskOrTasks(req: IRequestUser, res: Response): Promise<void> {
        if (req.query.id) {
            try {
                await db.query(`DELETE FROM tasks WHERE id=$1`, [
                    +req.query.id,
                ])

                res.status(200).json({ message: "Задача удалена" })
            } catch (e) {
                res.status(500).json({ message: 'Ошибка сервера' })
            }
        } else {
            try {
                await db.query(`DELETE FROM tasks`)

                res.status(200).json({ message: "Задачи удалены" })
            } catch (e) {
                res.status(500).json({ message: 'Ошибка сервера' })
            }
        }
    }


    public async getTasks(req: IRequestUser, res: Response): Promise<void> {
        if(req.user){
        try {
            const tasks: any = await db.query(`SELECT * FROM tasks WHERE user_id=$1`, [
                req.user.id,
            ])
            const data: IGetTask[] = tasks
            res.status(200).json(data)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка сервера' })
        }
    }else{
        res.status(500).json({message:"Ошибка сервера"})
    }
    }

    public async updateTasks(req: IRequestUser, res: Response): Promise<void> {
        if (req.body.id && typeof req.body.done==='boolean') {
            try {
                await db.query(`UPDATE tasks SET done=$1 WHERE id=$2`, [
                    req.body.done,
                    req.body.id
                ])
                res.status(200).json({ message: 'Задача обновлена' })
            } catch (e) {
                res.status(500).json({ message: 'Ошибка сервера' })
            }
        } else {
            res.status(400).json({ message: 'Нет данных' })
        }
    }
}




export default new TasksRequest();