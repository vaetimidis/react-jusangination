import type { ITask } from '#/pages/TodoList/TodoList';
import type { AxiosInstance, AxiosPromise } from 'axios';

export const TasksApi = (instance: AxiosInstance) => ({
  allTasks(): AxiosPromise<{ tasks: ITask[] }> {
    return instance.get(`${import.meta.env.VITE_API_URL}/tasks`);
  },

  async createTask(text: string): AxiosPromise<ITask> {
    return instance.post<ITask>(`${import.meta.env.VITE_API_URL}/task`, {
      text
    });
  }
});
