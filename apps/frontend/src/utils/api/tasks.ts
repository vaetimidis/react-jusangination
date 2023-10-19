import type { ITask } from '#/pages/TodoList/TodoList';
import type { AxiosInstance, AxiosPromise } from 'axios';

export const TasksApi = (instance: AxiosInstance) => ({
  allTasks(): AxiosPromise<{ tasks: ITask[] }> {
    return instance.get(`/tasks`);
  },

  async createTask(text: string): AxiosPromise<ITask> {
    return instance.post(`/task`, {
      text
    });
  },

  async updateTask(id: string, task: Partial<ITask>): AxiosPromise<ITask> {
    return instance.put(`/task/${id}`, task);
  }
});
