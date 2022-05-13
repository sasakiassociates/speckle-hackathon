import './App.scss';

import {SpeckleApi} from "./Components/SpeckleApi";
import SpeckleViewer from "./Components/SpeckleViewer";


export default function App() {

    //await SpeckleApi();

    return (
        <div className="App">
            <SpeckleViewer />
        </div>
    );
}
