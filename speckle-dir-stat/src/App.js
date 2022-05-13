import './App.scss';

//import {SpeckleApi} from "./Components/SpeckleApi";
import SpeckleViewer from "./Components/SpeckleViewer";
import Layout from './Components/Layout';
import LoadModal from './Components/LoadModal';


export default function App() {

    //await SpeckleApi();

    return (
        <div className="App">
            <SpeckleViewer />
            <Layout />

            <LoadModal />
        </div>
    );
}
