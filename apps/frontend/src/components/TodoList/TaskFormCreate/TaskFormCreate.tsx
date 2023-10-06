import type { ITask } from '../TodoList';
import type { ChangeEvent } from 'react';
import axios from 'axios';
import { useState } from 'react';
import React from 'react';

interface ITaskState {
  addTask: (task: ITask) => void;
}
export const TaskFormCreate = ({ addTask }: ITaskState) => {
  const [text, setText] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleNewTask = async (text: string) => {
    const response = await axios.post<ITask>(`${import.meta.env.VITE_URL}/task`, {
      text
    });

    addTask(response.data);

    setText('');
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
