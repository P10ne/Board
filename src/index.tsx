import 'antd/dist/antd.min.css';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RootStore, { TRootStore } from './store';
import Board from './store/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createdAuth } from './store/Auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const store = RootStore.create({
    board: Board.create(),
    auth: createdAuth
});

export const StoreContext = createContext<TRootStore>(store);

root.render(
    <StoreContext.Provider value={store}>
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
    </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
