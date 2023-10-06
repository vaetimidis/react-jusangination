import type { Request, Response } from 'express';
import type { ITask } from '#/types/index';
import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import { DB_FILE } from '#/server';
import { authenticateToken } from '#/middleware/authenticateToken';

export const taskRouter = Router();

taskRouter.post('/task', async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: 'no sending todos' });
    return;
  }

  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));

  if (db.tasks.find((t: ITask) => t.text === text)) {
    res.status(400).json({ message: 'This type of task is already exists' });
    return;
  }

  try {
    const newTodo = { id: uuid(), text: text, isDone: false };

    db.tasks.push(newTodo);

    fs.writeFileSync(DB_FILE, JSON.stringify(db));

    res.status(200).json(newTodo);
  } catch (error) {
    console.error('Error during creating new todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//add authenticateToken
taskRouter.get('/tasks', (req: Request, res: Response) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));

  const tasks = db.tasks;

  if (!tasks) {
    res.status(404).json({ message: 'no todos' });
    return;
  }

  try {
    res.json({ tasks });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
