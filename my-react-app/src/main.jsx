import { React, StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { Router , RouterProvider } from '@tanstack/react-router';
import { router } from './router/Router.jsx';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
