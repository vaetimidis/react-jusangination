import './style.scss';

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
                            <li className="tasks__item">go home</li>
                            <li className="tasks__item">buy burgers</li>
                            <li className="tasks__item">brush teeth</li>
                        </ul>
                    </div>
                    <div className="tasks--completed">
                        <ul className="tasks__list">
                            <li className="tasks__item">wake up</li>
                            <li className="tasks__item">eat breakfast</li>
                            <li className="tasks__item">wash your head</li>
                            <li className="tasks__item">start working</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
