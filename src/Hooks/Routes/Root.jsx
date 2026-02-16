import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from "../../Pages/Navbar";
import { Footer } from "../../Pages/Footer";
import ScrollToTop from "../../Component/ScrollToTop";


const Root = () => {
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    return (
        <div>
            <ScrollToTop />
            {!isDashboard && <Navbar />}
            <Outlet />
            {!isDashboard && <Footer/>}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};


export default Root;