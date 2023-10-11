import type { Request } from 'express';

export interface IUser {
  id: string;
  login: string;
  password: string;
}

export interface ITask {
  id: number;
  text: string;
  isDone: boolean;
}

// Расширение типа Request для добавления пользовательских данных
export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
