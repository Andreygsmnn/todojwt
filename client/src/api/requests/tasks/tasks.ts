import {ITasksRequests,IAddTaskBody, IUpdateTaskBody} from './types';
import {axiosConfig} from '../../axios.config';

class TasksRequests implements ITasksRequests{

    public addTask(body:IAddTaskBody):Promise<any>{
        return axiosConfig.post('tasks',body)
     }
    public deleteTaskOrTasks(query?: number | undefined): Promise<any> {
        return axiosConfig.delete(`tasks?id=${query||''}`)
    }
     
    public getTasks(): Promise<any> {
        return axiosConfig.get('tasks') 
    }
    public updateTask(body: IUpdateTaskBody): Promise<any> {
        return axiosConfig.put('tasks',body)
    }
}

export default new TasksRequests();