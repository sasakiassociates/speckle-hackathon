import logo from './logo.svg';
import './App.css';
import {Viewer} from '@speckle/viewer'


async function App() {

    const viewer = new Viewer({
        container: document.getElementById('renderer'),
        showStats: true
    });

    let t0 = Date.now();

    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/2decc3358e013f33da7af52fef29bb1b');
    console.log(`Finished loading in: ${(Date.now() - t0) / 1000}`);
    console.log(viewer.getObjectsProperties().length);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
