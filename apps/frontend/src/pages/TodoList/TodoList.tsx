import './style.scss';

import { useEffect, useState } from 'react';

import { TaskFormCreate } from '#/components/TodoList/TaskFormCreate/TaskFormCreate';
import { api } from '#/utils/api';
import { deepCopy } from '#/utils/helpers/deep-copy';

export interface ITask {
  id: string;
  text: string;
  isDone: boolean;
}

export const TodoList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = (task: ITask) => {
    setTasks(deepCopy(tasks).concat(task));
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.tasks.allTasks();
      setTasks(data.tasks);
    })();
  }, []);

  return (
    <div className="task-wrapper">
      <TaskFormCreate addTask={addTask} />
      <TodoList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};
