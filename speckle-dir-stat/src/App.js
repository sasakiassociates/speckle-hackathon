import './App.scss';
import SpeckleViewer from "./Components/SpeckleViewer";
import Layout from './Components/Layout';
import LoadModal from './Components/LoadModal';


export default function App() {


    return (
        <div className="App">
            <SpeckleViewer />
            <Layout />
            <LoadModal />
        </div>
    );
}
