import './App.css';
import {SpeckleApi} from "./Components/SpeckleApi";

// import {SpeckleViewer} from "./Components/SpeckleViewer";

async function App() {

    await SpeckleApi();

    return (
        <div className="App">
        </div>
    );
}

export default App;
