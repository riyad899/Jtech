import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
import { Home } from '../../Pages/Home';
import { Products } from '../../Pages/Products';
import SingleProduct from '../../Pages/SingleProduct';
import BuyProduct from '../../Pages/BuyProduct';
import BuyService from '../../Pages/BuyService';
import { Services } from '../../Pages/Services';
import SingleService from '../../Pages/SingleService';
import { About } from '../../Pages/About';
import { Contact } from '../../Pages/Contact';
import { Login } from '../../Pages/Login';
import Register from '../../Pages/Register';
import { Profile } from '../../Pages/Profile';
import { Dashboard } from '../../Pages/Dashboard';
import { TrackOrder } from '../../Pages/TrackOrder';
import Careers from '../../Pages/Careers';
import SendResume from '../../Pages/SendResume';
import Blog from '../../Pages/Blog';
import Privacy from '../../Pages/Privacy';
import PortfolioPage from '../../Pages/PortfolioPage';
import Checkout from '../../Pages/Checkout';
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
                path: '/product/:id',
                element: <SingleProduct />
            },
            {
                path: '/buy-product/:id',
                element: <BuyProduct />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/service/:id',
                element: <SingleService />
            },
            {
                path: '/buy-service/:id',
                element: <BuyService />
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
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/track-order',
                element: <TrackOrder />
            },
            {
                path: '/careers',
                element: <Careers />
            },
            {
                path: '/send-resume',
                element: <SendResume />
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/privacy',
                element: <Privacy />
            },
            {
                path: '/portfolio',
                element: <PortfolioPage />
            }
        ],
    },
], {
    future: {
        v7_startTransition: true,
    }
});


export default routes;


