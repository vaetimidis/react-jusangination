import axios from 'axios';

import { AuthApi } from './auth';
import { errorIntercept } from './interceptors/error-interceptors';
import { TasksApi } from './tasks';

interface ApiRerurnType {
  auth: ReturnType<typeof AuthApi>;
  tasks: ReturnType<typeof TasksApi>;
}

const apiCreator = (): ApiRerurnType => {
  const instanceJusang = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });

  instanceJusang.interceptors.response.use(undefined, errorIntercept);

  const apis = {
    auth: AuthApi(instanceJusang),
    tasks: TasksApi(instanceJusang)
  };

  return apis;
};

export const api = apiCreator();
