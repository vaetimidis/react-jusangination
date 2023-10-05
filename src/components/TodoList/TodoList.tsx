import axios from 'axios';
import './style.scss';
import { useEffect, useState } from 'react';
import { TaskFormCreate } from './TaskFormCreate/TaskFormCreate';

export interface ITasks {
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

    useEffect(() => {
        (async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        })();
    }, []);

    return (
        <div className="task-wrapper">
            <TaskFormCreate setTasks={setTasks} tasks={tasks} />
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
