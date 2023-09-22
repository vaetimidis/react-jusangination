import axios from 'axios';
import './style.scss';

interface ITasks {
    id: 'string';
    text: 'string';
    isDone: boolean;
}

interface IResp {
    todo: ITasks[];
}

let todosArr: ITasks[];

const getTasks = async (): Promise<ITasks[]> => {
    const url = 'http://localhost:8080/tasks';
    const response = await axios.get<IResp>(url);
    return response.data.todo;
};

getTasks().then((resp) => {
    todosArr = resp;
    console.log(todosArr);
});

export const TodoList = () => {
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
                            {todosArr.map((task: ITasks) =>
                                !task.isDone ? <li className="tasks__item">{task.text}</li> : ''
                            )}
                        </ul>
                    </div>
                    <div className="tasks--completed">
                        <ul className="tasks__list">
                            {todosArr.map((task: ITasks) =>
                                task.isDone ? <li className="tasks__item">{task.text}</li> : ''
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
