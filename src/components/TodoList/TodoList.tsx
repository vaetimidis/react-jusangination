import axios from 'axios';
import './style.scss';
import { useEffect, useState } from 'react';

interface ITasks {
    id: 'string';
    text: 'string';
    isDone: boolean;
}

interface IResp {
    tasks: ITasks[];
}

const getTasks = async (): Promise<ITasks[]> => {
    const url = 'http://localhost:8080/tasks';
    const response = await axios.get<IResp>(url);
    return response.data.tasks;
};

export const TodoList = () => {
    const [tasks, setTasks] = useState<ITasks[] | []>([]);

    useEffect(() => {
        (async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        })();
    }, []);

    return (
        <>
            <div className="task-wrapper">
                <div className="task-wrapper__headline">
                    <input type="text" className="add-task" />
                    <button className="confirm-task">confirm</button>
                </div>
                <div className="task-wrapper__section">
                    <div className="tasks--uncompleted">
                        <ul className="tasks__list">
                            {tasks.map((task: ITasks) => {
                                return !task.isDone ? (
                                    <li key={task.id} className="tasks__item uncompleted">
                                        {task.text}
                                    </li>
                                ) : (
                                    ''
                                );
                            })}
                        </ul>
                    </div>
                    <div className="tasks--completed">
                        <ul className="tasks__list">
                            {tasks.map((task: ITasks) => {
                                return task.isDone ? (
                                    <li key={task.id} className="tasks__item completed">
                                        {task.text}
                                    </li>
                                ) : (
                                    ''
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
