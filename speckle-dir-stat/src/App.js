import './App.scss';

import {SpeckleApi} from "./Components/SpeckleApi";
import SpeckleViewer from "./Components/SpeckleViewer";
import DataPanel from './Components/DataPanel';


export default function App() {

    //await SpeckleApi();

    return (
        <div className="App">
            <SpeckleViewer />

            <div className="layout">
                <DataPanel />
            </div>
        </div>
    );
}
