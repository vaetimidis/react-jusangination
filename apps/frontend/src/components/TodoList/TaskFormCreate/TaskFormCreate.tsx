import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { ITask } from '#/pages/TodoList/TodoList';

import { api } from '#/utils/api';

interface ITaskState {
  addTask: (task: ITask) => void;
}
export const TaskFormCreate = ({ addTask }: ITaskState) => {
  const [text, setText] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleNewTask = async (text: string) => {
    try {
      const { data } = await api.tasks.createTask(text);
      addTask(data);
      setText('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task-wrapper__headline">
      <input type="text" className="add-task" value={text} onChange={handleChange} />
      <button className="confirm-task" onClick={() => handleNewTask(text)}>
        confirm
      </button>
    </div>
  );
};
