import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import Entities, { Entity } from "./stores/Entities";

const entities = new Entities();
entities.addEntity(new Entity('2decc3358e013f33da7af52fef29bb1b'));
entities.addEntity(new Entity('69bfa91caf1fc4b0c82211cd92387bfb'));
entities.addEntity(new Entity('e2102416acdd10b49b51c58acdf02099'));
entities.addEntity(new Entity('f6499a518b7d56fdf918aaa1dda02ee6'));
entities.addEntity(new Entity('47216939852a6a177a8ae8b924140c65'));
entities.addEntity(new Entity('eebc05e4a8bafecff0d03316bb03bd92'));
entities.addEntity(new Entity('f84216590e0ea1db8ea90513cc1236e6'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App entities={entities} />
  </React.StrictMode>
)
