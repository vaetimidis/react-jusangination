import './style.scss';

import { useEffect, useState } from 'react';

import axios from 'axios';

import { TaskFormCreate } from './TaskFormCreate/TaskFormCreate';

export interface ITask {
  id: string;
  text: string;
  isDone: boolean;
}

export interface IResp {
  tasks: ITask[];
}

const getTasks = async (): Promise<ITask[]> => {
  const { data } = await axios.get<IResp>(`${import.meta.env.VITE_URL}/tasks`);
  return data.tasks;
};

export const TodoList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = (task: ITask) => {
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    (async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    })();
  }, []);

  return (
    <div className="task-wrapper">
      <TaskFormCreate addTask={addTask} />
      <div className="task-wrapper__section">
        <div className="tasks--uncompleted">
          <ul className="tasks__list">
            {tasks.map((task: ITask) => {
              return (
                !task.isDone && (
                  <li key={task.id} className="tasks__item uncompleted">
                    {task.text}
                  </li>
                )
              );
            })}
          </ul>
        </div>
        <div className="tasks--completed">
          <ul className="tasks__list">
            {tasks.map((task: ITask) => {
              return (
                task.isDone && (
                  <li key={task.id} className="tasks__item completed">
                    {task.text}
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
