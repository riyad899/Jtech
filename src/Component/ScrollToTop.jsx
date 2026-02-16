import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        // If there's a hash in the URL (like #section), scroll to that element
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                return;
            }
        }

        // For normal navigation, scroll to top
        // The key changes when using browser back/forward, so we can handle that differently
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // Change to 'auto' for instant scroll
        });
    }, [pathname, hash, key]);

    return null;
};

export default ScrollToTop;