// import { Game } from './components/Game/Game';
import { Layout } from './components/layouts/Layout';
import './style.scss';

function App() {
    return (
        <Layout>
            <div className="wrapper">
                cringe below:
                <ul className="wrapper__list">
                    <li>
                        <a href="/game">ttt</a>
                    </li>
                    <li>
                        <a href="/tasks">list</a>
                    </li>
                </ul>
            </div>
        </Layout>
    );
}

export default App;
