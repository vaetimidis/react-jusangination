import axios from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { ITasks } from '../TodoList';

export const TaskFormCreate = ({
    setTasks,
    tasks,
}: {
    setTasks: Dispatch<SetStateAction<ITasks[]>>;
    tasks: ITasks[];
}) => {
    const [text, setText] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleNewTask = async (text: string) => {
        const url = 'http://localhost:8080/task';
        const response = await axios.post(url, { text });

        const newTasks = [...tasks, response.data];

        setTasks(newTasks);

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
