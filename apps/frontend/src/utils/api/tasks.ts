import type { IResp, ITask } from '#/pages/TodoList/TodoList';
import type { AxiosInstance } from 'axios';

export const TasksApi = (instance: AxiosInstance) => ({
  async allTasks(): Promise<ITask[]> {
    const { data } = await instance.get<IResp>(`${import.meta.env.VITE_API_URL}/tasks`);
    return data.tasks;
  },

  async createTask(text: string): Promise<ITask> {
    const { data } = await instance.post<ITask>(`${import.meta.env.VITE_API_URL}/task`, {
      text
    });

    return data;
  }
});
