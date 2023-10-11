import type { AuthenticatedRequest, IUser } from '#/types/index';
import type { Request, Response } from 'express';
import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { authenticateToken } from '#/middleware/authenticateToken';
import { DB_FILE, SECRET_KEY } from '#/server';

export const authRouter = Router();

// Обработчик для регистрации нового пользователя
authRouter.post('/sign-up', async (req: Request, res: Response): Promise<void> => {
  const { login, password } = req.body;

  // Проверяем, что оба поля заполнены
  if (!login || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  // Читаем данные из файла
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

  // Проверяем, что пользователь с таким именем не существует
  if (db.users.find((user: IUser) => user.login === login)) {
    res.status(400).json({ message: 'Username already exists' });
    return;
  }

  try {
    // Хешируем пароль
    // TODO

    // Создаем нового пользователя
    const newUser = { id: uuid(), login, password };

    // Добавляем пользователя в базу данных
    db.users.push(newUser);

    // Сохраняем обновленные данные в файл
    fs.writeFileSync(DB_FILE, JSON.stringify(db));

    res.sendStatus(200);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Маршрут для получения данных пользователя по JWT
authRouter.get('/me', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user as IUser;

  // Читаем данные из файла
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

  // Ищем пользователя с указанным именем
  const user = db.users.find((u: IUser) => u.id === id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  try {
    // Обновляем JWT токен
    const token = jwt.sign({ id }, SECRET_KEY);

    // Возвращаем данные пользователя и обновленный JWT токен
    res.json({ user, token });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Обработчик для аутентификации пользователя и выдачи токена
authRouter.post('/sign-in', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // Проверяем, что оба поля заполнены
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  // Читаем данные из файла
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

  // Ищем пользователя с указанным именем
  const user = db.users.find((u: IUser) => u.username === username);

  if (!user) {
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }

  try {
    // Сравниваем хешированный пароль с введенным паролем
    // TODO

    if (!password) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // Создаем JWT токен
    const token = jwt.sign({ id: user.id }, SECRET_KEY);

    res.json({ token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
