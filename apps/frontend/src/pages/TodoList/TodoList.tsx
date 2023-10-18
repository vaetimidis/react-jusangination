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
      const { data } = await api.tasks.allTasks();
      setTasks(data.tasks);
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
