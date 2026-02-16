import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import routes from './Hooks/Routes/Router';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './AuthProvider/AuthContext';
import { CartProvider } from './Context/CartContext';
import { HelmetProvider } from 'react-helmet-async';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={routes} />
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
