import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; 
import App from './App'; 
import { Provider } from 'react-redux';
import store from './store'; 

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* BrowserRouter - это компонент React Router, который обеспечивает маршрутизацию */}
    <BrowserRouter>
      {/* Provider - это компонент React-Redux, который делает Redux Store доступным для всех компонентов */}
      <Provider store={store}>
        <App /> {/* Наш главный компонент приложения */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

