import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to handle scroll behavior on route changes
 * @param {Object} options - Configuration options
 * @param {boolean} options.smooth - Whether to use smooth scrolling (default: true)
 * @param {boolean} options.top - Whether to scroll to top (default: true)
 * @param {number} options.delay - Delay before scrolling in ms (default: 0)
 */
export const useScrollToTop = (options = {}) => {
    const { smooth = true, top = true, delay = 0 } = options;
    const { pathname } = useLocation();

    useEffect(() => {
        if (!top) return;

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: smooth ? 'smooth' : 'auto'
            });
        };

        if (delay > 0) {
            const timer = setTimeout(scrollToTop, delay);
            return () => clearTimeout(timer);
        } else {
            scrollToTop();
        }
    }, [pathname, smooth, top, delay]);
};

/**
 * Hook to scroll to a specific element
 * @param {string} elementId - The ID of the element to scroll to
 * @param {Object} options - Scroll options
 */
export const useScrollToElement = (elementId, options = {}) => {
    const { behavior = 'smooth', block = 'start', inline = 'nearest' } = options;

    const scrollToElement = () => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior,
                block,
                inline
            });
        }
    };

    return scrollToElement;
};

/**
 * Hook to preserve scroll position for specific routes
 * Useful for long lists or content where users might want to return to their position
 */
export const useScrollPosition = (key) => {
    const location = useLocation();

    useEffect(() => {
        // Save scroll position when component unmounts
        return () => {
            sessionStorage.setItem(`scroll-${key}`, window.pageYOffset.toString());
        };
    }, [key]);

    useEffect(() => {
        // Restore scroll position when component mounts
        const savedPosition = sessionStorage.getItem(`scroll-${key}`);
        if (savedPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedPosition, 10));
            }, 100);
        }
    }, [location.pathname, key]);
};