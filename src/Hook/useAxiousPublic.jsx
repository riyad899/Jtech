import axios from 'axios';

const useAxiosPublic = () => {
    // Create axios instance with base configuration
    const axiosPublic = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        timeout: 10000, // 10 seconds timeout
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });

    // Request interceptor
    axiosPublic.interceptors.request.use(
        (config) => {
            // Add timestamp to prevent caching for GET requests
            if (config.method === 'get') {
                config.params = {
                    ...config.params,
                    _t: Date.now()
                };
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axiosPublic.interceptors.response.use(
        (response) => {
            // Handle successful responses

            return response;
        },
        (error) => {
            // Handle response errors
            console.error('Response error:', error);

            // You can handle specific error codes here
            if (error.response?.status === 401) {
                // Handle unauthorized access
                console.error('Unauthorized access');
            } else if (error.response?.status === 500) {
                // Handle server errors
                console.error('Server error');
            } else if (!error.response) {
                // Handle network errors
                console.error('Network error - Server might be down');
            }

            return Promise.reject(error);
        }
    );

    // Team management API functions
    const teamAPI = {
        // Get all team members
        getTeamMembers: () => axiosPublic.get('/team'),

        // Add new team member
        addTeamMember: (teamData) => axiosPublic.post('/team', teamData),

        // Update team member
        updateTeamMember: (id, teamData) => axiosPublic.put(`/team/${id}`, teamData),

        // Delete team member
        deleteTeamMember: (id) => axiosPublic.delete(`/team/${id}`),

        // Get single team member
        getTeamMember: (id) => axiosPublic.get(`/team/${id}`)
    };



    // Service management API functions
    const serviceAPI = {
        // Get all services
        getServices: () => axiosPublic.get('/services'),

        // Add new service
        addService: (serviceData) => axiosPublic.post('/services', serviceData),

        // Update service
        updateService: (id, serviceData) => axiosPublic.put(`/services/${id}`, serviceData),

        // Delete service
        deleteService: (id) => axiosPublic.delete(`/services/${id}`),

        // Get single service
        getService: (id) => axiosPublic.get(`/services/${id}`),

        // Get service by title
        getServiceByTitle: (title) => axiosPublic.get(`/services/title/${title}`),

        // Get services by category
        getServicesByCategory: (category) => axiosPublic.get(`/services/category/${category}`),

        // Get services by status
        getServicesByStatus: (status) => axiosPublic.get(`/services/status/${status}`),

        // Get services by provider
        getServicesByProvider: (provider) => axiosPublic.get(`/services/provider/${provider}`),

        // Get services by price range
        getServicesByPriceRange: (minPrice, maxPrice) => axiosPublic.get(`/services/price/${minPrice}/${maxPrice}`),

        // Get unique categories from services
        getServiceCategories: () => axiosPublic.get('/services/categories'),

        // Get unique providers from services
        getServiceProviders: () => axiosPublic.get('/services/providers')
    };

    // User management API functions
    const userAPI = {
        // Get all users
        getUsers: () => axiosPublic.get('/users'),

        // Add new user
        addUser: (userData) => axiosPublic.post('/users', userData),

        // Update user
        updateUser: (id, userData) => axiosPublic.put(`/users/${id}`, userData),

        // Delete user
        deleteUser: (id) => axiosPublic.delete(`/users/${id}`),

        // Get single user by ID
        getUser: (id) => axiosPublic.get(`/users/${id}`),

        // Get user by email
        getUserByEmail: (email) => axiosPublic.get(`/users/email/${email}`)
    };

    // Product management API functions
    const productAPI = {
        // Get all products
        getProducts: () => axiosPublic.get('/products'),

        // Add new product
        addProduct: (productData) => axiosPublic.post('/products', productData),

        // Update product
        updateProduct: (id, productData) => axiosPublic.put(`/products/${id}`, productData),

        // Delete product
        deleteProduct: (id) => axiosPublic.delete(`/products/${id}`),

        // Get single product by ID
        getProduct: (id) => axiosPublic.get(`/products/${id}`),

        // Get product by name
        getProductByName: (name) => axiosPublic.get(`/products/name/${name}`),

        // Get products by category
        getProductsByCategory: (category) => axiosPublic.get(`/products/category/${category}`),

        // Get products by brand
        getProductsByBrand: (brand) => axiosPublic.get(`/products/brand/${brand}`),

        // Get products by price range
        getProductsByPriceRange: (minPrice, maxPrice) => axiosPublic.get(`/products/price/${minPrice}/${maxPrice}`),

        // Get products by rating
        getProductsByRating: (minRating) => axiosPublic.get(`/products/rating/${minRating}`),

        // Search products with multiple criteria
        searchProducts: (searchParams) => {
            const queryString = new URLSearchParams(searchParams).toString();
            return axiosPublic.get(`/products/search?${queryString}`);
        },

        // Get unique categories from products
        getCategories: () => axiosPublic.get('/products/categories'),

        // Get unique brands from products
        getBrands: () => axiosPublic.get('/products/brands')
    };

    // Review management API functions
    const reviewAPI = {
        // Add review to product
        addReview: (productId, reviewData) => axiosPublic.post(`/products/${productId}/reviews`, reviewData),

        // Get all reviews for a product
        getProductReviews: (productId) => axiosPublic.get(`/products/${productId}/reviews`),

        // Delete a specific review
        deleteReview: (productId, reviewId) => axiosPublic.delete(`/products/${productId}/reviews/${reviewId}`),

        // Mark review as helpful
        markReviewHelpful: (productId, reviewId) => axiosPublic.put(`/products/${productId}/reviews/${reviewId}/helpful`),

        // Get user's reviews
        getUserReviews: (email) => axiosPublic.get(`/products/reviews/user/${email}`)
    };

    // Job management API functions
    const jobAPI = {
        // Get all jobs
        getJobs: () => axiosPublic.get('/jobs'),

        // Add new job posting
        addJob: (jobData) => axiosPublic.post('/jobs', jobData),

        // Update job posting
        updateJob: (id, jobData) => axiosPublic.put(`/jobs/${id}`, jobData),

        // Delete job posting
        deleteJob: (id) => axiosPublic.delete(`/jobs/${id}`),

        // Get single job by ID
        getJob: (id) => axiosPublic.get(`/jobs/${id}`),

        // Get jobs by department
        getJobsByDepartment: (department) => axiosPublic.get(`/jobs/department/${department}`),

        // Get jobs by location
        getJobsByLocation: (location) => axiosPublic.get(`/jobs/location/${location}`),

        // Get jobs by type
        getJobsByType: (type) => axiosPublic.get(`/jobs/type/${type}`),

        // Search jobs
        searchJobs: (query) => axiosPublic.get(`/jobs/search/${query}`),

        // Filter jobs with multiple criteria
        filterJobs: (filterParams) => {
            const queryString = new URLSearchParams(filterParams).toString();
            return axiosPublic.get(`/jobs/filter?${queryString}`);
        },

        // Get job statistics for dashboard
        getJobStats: () => axiosPublic.get('/jobs/stats/dashboard')
    };

    // Message management API functions
    const messageAPI = {
        // Submit contact form (POST /messages)
        submitMessage: (messageData) => axiosPublic.post('/messages', messageData),

        // Get all messages - Admin (GET /messages)
        getAllMessages: () => axiosPublic.get('/messages'),

        // Get single message by ID (GET /messages/:id)
        getMessage: (id) => axiosPublic.get(`/messages/${id}`),

        // Delete message - Admin (DELETE /messages/:id)
        deleteMessage: (id) => axiosPublic.delete(`/messages/${id}`),

        // Update message status (PATCH /messages/:id/status)
        updateMessageStatus: (id, status) => axiosPublic.patch(`/messages/${id}/status`, { status }),

        // Add reply to message (PATCH /messages/:id/reply)
        replyToMessage: (id, replyText) => axiosPublic.patch(`/messages/${id}/reply`, { reply: replyText }),

        // Get messages by status (GET /messages/status/:status)
        getMessagesByStatus: (status) => axiosPublic.get(`/messages/status/${status}`),

        // Get messages by service interest (GET /messages/service/:service)
        getMessagesByService: (service) => axiosPublic.get(`/messages/service/${service}`),

        // Search messages (GET /messages/search/:query)
        searchMessages: (query) => axiosPublic.get(`/messages/search/${query}`),

        // Get message statistics for dashboard (GET /messages/stats/dashboard)
        getMessageStats: () => axiosPublic.get('/messages/stats/dashboard')
    };

    // Service Order management API functions
    const serviceOrderAPI = {
        // Place a service order (POST /buyservices)
        placeServiceOrder: (orderData) => axiosPublic.post('/buyservices', orderData),

        // Get all service orders - Admin (GET /buyservices)
        getAllServiceOrders: () => axiosPublic.get('/buyservices'),

        // Get single service order (GET /buyservices/:id)
        getServiceOrder: (id) => axiosPublic.get(`/buyservices/${id}`),

        // Get orders by phone number (GET /buyservices/phone/:phone)
        getServiceOrdersByPhone: (phone) => axiosPublic.get(`/buyservices/phone/${phone}`),

        // Delete service order - Admin (DELETE /buyservices/:id)
        deleteServiceOrder: (id) => axiosPublic.delete(`/buyservices/${id}`),

        // Update order status (PATCH /buyservices/:id/status)
        updateServiceOrderStatus: (id, status) => axiosPublic.patch(`/buyservices/${id}/status`, { status }),

        // Update payment status (PATCH /buyservices/:id/payment)
        updateServiceOrderPayment: (id, paymentData) => axiosPublic.patch(`/buyservices/${id}/payment`, paymentData),

        // Filter by order status (GET /buyservices/status/:status)
        getServiceOrdersByStatus: (status) => axiosPublic.get(`/buyservices/status/${status}`),

        // Filter by payment status (GET /buyservices/payment/:paymentStatus)
        getServiceOrdersByPaymentStatus: (paymentStatus) => axiosPublic.get(`/buyservices/payment/${paymentStatus}`),

        // Filter by payment method (GET /buyservices/method/:paymentMethod)
        getServiceOrdersByPaymentMethod: (paymentMethod) => axiosPublic.get(`/buyservices/method/${paymentMethod}`),

        // Search service orders (GET /buyservices/search/:query)
        searchServiceOrders: (query) => axiosPublic.get(`/buyservices/search/${query}`),

        // Get service order statistics (GET /buyservices/stats/dashboard)
        getServiceOrderStats: () => axiosPublic.get('/buyservices/stats/dashboard')
    };

    // Product Order management API functions
    const orderAPI = {
        // Get orders by user email (GET /orders/user/:email)
        getOrdersByEmail: (email) => axiosPublic.get(`/orders/user/${email}`),

        // Update order status (PATCH /orders/:id/status)
        updateOrderStatus: (id, status) => axiosPublic.patch(`/orders/${id}/status`, { status }),

        // Get single order (GET /orders/:id)
        getOrder: (id) => axiosPublic.get(`/orders/${id}`),

        // Get all orders - Admin (GET /orders)
        getAllOrders: () => axiosPublic.get('/orders'),

        // Delete order - Admin (DELETE /orders/:id)
        deleteOrder: (id) => axiosPublic.delete(`/orders/${id}`)
    };

    return { axiosPublic, teamAPI, serviceAPI, userAPI, productAPI, reviewAPI, jobAPI, messageAPI, serviceOrderAPI, orderAPI };
};

export default useAxiosPublic;
