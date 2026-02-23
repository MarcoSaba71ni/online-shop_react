import { React, StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { Router , RouterProvider } from '@tanstack/react-router';
import { router } from './router/Router.jsx';
import './index.css'
import { store , persistor } from './app/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider 
          router={router} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)
