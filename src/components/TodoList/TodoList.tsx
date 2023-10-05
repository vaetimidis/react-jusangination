import axios from 'axios';
import './style.scss';
import { ChangeEvent, useEffect, useState } from 'react';

interface ITasks {
    id: string;
    text: string;
    isDone: boolean;
}

interface IResp {
    tasks: ITasks[];
}

const getTasks = async (): Promise<ITasks[]> => {
    const url = 'http://localhost:8080/tasks';
    const { data } = await axios.get<IResp>(url);
    return data.tasks;
};

export const TodoList = () => {
    const [tasks, setTasks] = useState<ITasks[]>([]);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        (async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        })();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleNewTask = async (text: string) => {
        const url = 'http://localhost:8080/task';
        const response = await axios.post(url, { text });

        setTasks(response.data);
    };

    return (
        <div className="task-wrapper">
            <div className="task-wrapper__headline">
                <input type="text" className="add-task" id="task" onChange={handleChange} />
                <button className="confirm-task" onClick={() => handleNewTask(text)}>
                    confirm
                </button>
            </div>
            <div className="task-wrapper__section">
                <div className="tasks--uncompleted">
                    <ul className="tasks__list">
                        {tasks.map((task: ITasks) => {
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
                        {tasks.map((task: ITasks) => {
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
