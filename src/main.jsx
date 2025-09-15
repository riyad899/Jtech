import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import routes from './Hooks/Routes/Router';
import { RouterProvider } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
