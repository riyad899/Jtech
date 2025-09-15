import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
import { Home } from '../../Pages/Home';
import { Products } from '../../Pages/Products';
import { Services } from '../../Pages/Services';
import { About } from '../../Pages/About';
import { Contact } from '../../Pages/Contact';
import { Login } from '../../Pages/Login';
import { Register } from '../../Pages/Register';
import Root from './Root';



const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ],
    },
]);


export default routes;


