import 'antd/dist/antd.min.css';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import rootStore, { IRootStore } from './store';
import { AuthProvider, TMainAuthContext } from './modules/Auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const StoreContext = createContext<IRootStore>(rootStore);
const authContextValue: TMainAuthContext = {
    auth: rootStore.auth
}

root.render(
    <StoreContext.Provider value={rootStore}>
        <AuthProvider contextValue={authContextValue}>
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        </AuthProvider>
    </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
