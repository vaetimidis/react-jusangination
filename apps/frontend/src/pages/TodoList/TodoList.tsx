import './style.scss';

import { useEffect, useState } from 'react';

import { TaskFormCreate } from '#/components/TodoList/TaskFormCreate/TaskFormCreate';
import { api } from '#/utils/api';

export interface ITask {
  id: string;
  text: string;
  isDone: boolean;
}

export interface IResp {
  tasks: ITask[];
}

const getTasks = async (): Promise<ITask[]> => {
  return api.tasks.allTasks();
};

export const TodoList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = (task: ITask) => {
    setTasks([...tasks, task]);
  };

  const renderTaskItems = (isDone: boolean) => {
    return tasks
      .filter((task) => task.isDone === isDone)
      .map((task) => (
        <li key={task.id} className={`tasks__item ${isDone ? 'completed' : 'uncompleted'}`}>
          {task.text}
        </li>
      ));
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
          <ul className="tasks__list">{renderTaskItems(false)}</ul>
        </div>
        <div className="tasks--completed">
          <ul className="tasks__list">{renderTaskItems(true)}</ul>
        </div>
      </div>
    </div>
  );
};
