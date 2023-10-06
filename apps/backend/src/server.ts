import { print } from './utils/print-route';
import { allowCrossDomain } from './utils/allow-cross-domain';
import { authRouter } from './api/auth/auth.controller';
import { taskRouter } from './api/task/task.controller';
import express from 'express';

const PORT = 8080;
export const SECRET_KEY = 'SECRET_KEY';
export const DB_FILE = './database/db.json';

export const app = express();

// Middleware для разбора JSON-тела запроса
app.use(express.json());
app.use(allowCrossDomain);
app.use(authRouter);
app.use(taskRouter);

// Запуск сервера
app.listen(PORT, () => {
  console.log('\x1b[34m%s\x1B[0m', '---------------------------------------');
  console.log('\x1b[34m%s\x1B[0m', `Server is running on port localhost:`);
  console.log('\x1b[34m%s\x1B[0m', `✨ Server listening http://localhost:${PORT} \n`);
  app._router.stack.forEach(print.bind(null, []));
  console.log('\x1b[34m%s\x1B[0m', '---------------------------------------');
});
