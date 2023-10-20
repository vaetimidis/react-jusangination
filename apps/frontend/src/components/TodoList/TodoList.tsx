import type { ITask } from '#/pages/TodoList/TodoList';

import { api } from '#/utils/api';

export const TodoList = (
  tasks: ITask[],
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
) => {
  const renderTaskItems = (tasks: ITask[], isDone: boolean) => {
    return tasks
      .filter((task) => task.isDone === isDone)
      .map((task) => (
        <li
          key={task.id}
          id={task.id}
          onClick={() => updateTask(task.id, { isDone: !task.isDone })}
          className={`tasks__item ${isDone ? 'completed' : 'uncompleted'}`}>
          {task.text}
        </li>
      ));
  };

  const updateTask = async (id: string, updatedTask: Partial<ITask>) => {
    try {
      const { data } = await api.tasks.updateTask(id, updatedTask);

      setTasks((prev) =>
        prev.map((task) => (task.id === data.id ? { ...task, isDone: data.isDone } : task))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-wrapper__section">
      <div className="tasks--uncompleted">
        <ul className="tasks__list">{renderTaskItems(tasks, false)}</ul>
      </div>
      <div className="tasks--completed">
        <ul className="tasks__list">{renderTaskItems(tasks, true)}</ul>
      </div>
    </div>
  );
};
