import fs from 'fs';

import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import type { IDatabase, ITask } from '#/types/index';
import type { Request, Response } from 'express';

import { DB_FILE } from '#/server';

export const taskRouter = Router();

taskRouter.post('/task', async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: 'No sending task text' });
    return;
  }

  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) as IDatabase;

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
    console.error('Error during creating new task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

taskRouter.put('/task/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const task = req.body as ITask;

  if (!task || !id) {
    res.status(400).json({ message: 'No sending task info' });
    return;
  }

  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) as IDatabase;

  const foundedTask = db.tasks.find((task: ITask) => task.id === id);

  if (!foundedTask) {
    res.status(400).json({ message: "Task doesn't exists" });
    return;
  }

  try {
    const updatedTask = { ...foundedTask, ...task };
    db.tasks = db.tasks.map((m) => (m.id === id ? updatedTask : m));

    fs.writeFileSync(DB_FILE, JSON.stringify(db));

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error during updating new task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//add authenticateToken
taskRouter.get('/tasks', (req: Request, res: Response) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) as IDatabase;

  const tasks = db.tasks;

  if (!tasks) {
    res.status(404).json({ message: 'No tasks' });
    return;
  }

  try {
    res.json({ tasks });
  } catch (error) {
    console.error('Error during get tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
