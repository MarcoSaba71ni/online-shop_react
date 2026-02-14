import { React, StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { Router , RouterProvider } from '@tanstack/react-router';
import { router } from './router/Router.jsx';
import './index.css'
import { store } from './app/store.js';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider 
      router={router} />
    </Provider>
  </StrictMode>
)
