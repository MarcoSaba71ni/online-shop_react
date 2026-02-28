import { StrictMode } from 'react'
import App from './App';
import ReactDOM from "react-dom/client";
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router/Router';
import './index.css'
import { store , persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error ("Root element could not be found");
}


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 6 * 5,
      gcTime: 1000 * 6 * 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    }
  },

});

ReactDOM.createRoot(rootElement).render(
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
);
