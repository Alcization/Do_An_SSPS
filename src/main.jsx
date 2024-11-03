import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
//import App from './App.jsx'
import Home from './pages/not_log_in/Home.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // Change to pages that you want to render
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)
