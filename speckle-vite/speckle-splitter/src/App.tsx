import { useState } from 'react'
import logo from './logo.svg'
import './App.scss'
import { ViewerControl } from "./ViewerControl";
import { observer } from "mobx-react";
import Entities from "./stores/Entities";
import { List } from "./List";

type AppProps = {
    entities: Entities;
};

export const App = observer(({entities}: AppProps) => {
    return (
        <div className="App">
            <List entities={entities}/>
            <ViewerControl entities={entities}/>
        </div>
    )
});
