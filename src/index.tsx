import 'reflect-metadata';
import 'antd/dist/antd.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthProvider } from './modules/Auth';
import { TAuthProviderProps } from './modules/Auth/components/AuthProvider/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const authProviderProps: Omit<TAuthProviderProps, 'children'> = {

}

root.render(
    <AuthProvider { ...authProviderProps }>
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
