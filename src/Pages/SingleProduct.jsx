import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Calendar, Package, User, Edit, Trash2, Heart, Share2, ShoppingCart, ChevronLeft, Tag, Info, CheckCircle, Monitor, Smartphone, Tablet, Headphones, Gamepad2, Watch, Loader2, AlertCircle } from 'lucide-react';
import { AuthContext } from '../AuthProvider/AuthContext';
import { useCart } from '../Context/CartContext';
import useAxiosPublic from '../Hook/useAxiousPublic';
import SEO from '../utils/SEO';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { productAPI, reviewAPI } = useAxiosPublic();
  const { addToCart, isInCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generate enhanced product info
  const generateTechSpecs = (product) => {
    const specs = {
      laptops: {
        processor: product.brand === 'Apple' ? 'M3 Pro Chip' : 'Intel Core i7',
        memory: product.memory || '16GB RAM',
        storage: product.storage || '512GB SSD',
        display: product.display || '14-16 inch Retina Display',
        graphics: product.graphics || (product.brand === 'Apple' ? 'Integrated GPU' : 'NVIDIA RTX 4060'),
        battery: product.battery || 'Up to 18 hours',
        weight: product.weight || '3.5 lbs',
        ports: product.ports || 'Thunderbolt 4, USB-C, HDMI'
      },
      smartphones: {
        processor: product.processor || (product.brand === 'Apple' ? 'A17 Pro Chip' : 'Snapdragon 8 Gen 3'),
        memory: product.memory || '8GB RAM',
        storage: product.storage || '256GB',
        display: product.display || '6.1-6.7 inch OLED',
        camera: 'Main Camera System',
        battery: product.battery || '24+ hours video playback',
        weight: product.weight || '221g',
        connectivity: 'Network Connectivity'
      },
      tablets: {
        processor: product.processor || (product.brand === 'Apple' ? 'M2 Chip' : 'Snapdragon 8cx Gen 3'),
        memory: product.memory || '8GB RAM',
        storage: product.storage || '256GB',
        display: product.display || '11-12.9 inch Display',
        camera: 'Camera System',
        battery: product.battery || 'Up to 10 hours',
        weight: product.weight || '1.5 lbs',
        connectivity: 'Wireless Connectivity'
      },
      monitors: {
        size: '24-34 inches',
        resolution: '4K UHD (3840x2160)',
        refresh_rate: '144Hz',
        panel_type: 'IPS',
        color_accuracy: '99% sRGB',
        connectivity: 'HDMI 2.1, DisplayPort 1.4, USB-C',
        stand: 'Height/Tilt/Swivel Adjustable',
        hdr: 'HDR10 Support'
      },
      audio: {
        driver_size: '40mm Dynamic',
        frequency_response: '20Hz - 20kHz',
        impedance: '32 Ohms',
        battery_life: product.battery || 'Up to 30 hours',
        noise_cancellation: 'Active Noise Cancellation',
        connectivity: 'Bluetooth 5.2, 3.5mm Jack',
        weight: product.weight || '250g',
        features: 'Quick Charge, Voice Assistant'
      },
      gaming: {
        processor: product.processor || (product.brand === 'Sony' ? 'Custom AMD Zen 2' : 'Custom AMD RDNA 2'),
        memory: product.memory || '16GB GDDR6',
        storage: product.storage || '825GB SSD',
        graphics: product.graphics || 'Custom GPU 10.28 TFLOPs',
        resolution: '4K UHD Gaming',
        frame_rate: 'Up to 120fps',
        audio: '3D Audio Technology',
        connectivity: 'Wi-Fi 6, Bluetooth 5.1'
      },
      accessories: {
        compatibility: 'Universal',
        connectivity: 'Bluetooth 5.3, USB-C',
        battery_life: product.battery || 'Up to 7 days',
        water_resistance: 'IP68',
        sensors: 'Heart Rate, GPS, Accelerometer',
        display: product.display || 'Display',
        weight: product.weight || '45g',
        materials: 'Premium Materials'
      }
    };
    return specs[product.category] || specs.accessories;
  };

  const generateWarranty = (product) => {
    return {
      standard: '1 Year Limited Warranty',
      extended: '2 Year Extended Warranty Available',
      coverage: 'Manufacturing defects, hardware failures',
      support: '24/7 Customer Support',
      returns: '30-day return policy',
      repairs: 'Authorized service centers nationwide'
    };
  };

  const generateRelatedProducts = async (currentProduct) => {
    try {
      // Get products from same category, excluding current product
      const response = await productAPI.getProductsByCategory(currentProduct.category);
      const categoryProducts = response.data;
      return categoryProducts
        .filter(p => p._id !== currentProduct._id)
        .slice(0, 4);
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      laptops: Monitor,
      smartphones: Smartphone,
      tablets: Tablet,
      monitors: Monitor,
      audio: Headphones,
      gaming: Gamepad2,
      accessories: Watch
    };
    return icons[category] || Monitor;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch product from API
        const response = await productAPI.getProduct(id);
        const foundProduct = response.data;

        if (!foundProduct) {
          throw new Error('Product not found');
        }

        // Enhance the product with additional data
        const enhancedProduct = {
          ...foundProduct,
          techSpecs: generateTechSpecs(foundProduct),
          warranty: generateWarranty(foundProduct),
          reviews: foundProduct.reviews?.length || Math.floor(Math.random() * 200) + 50,
          inStock: foundProduct.inStock !== undefined ? foundProduct.inStock : Math.random() > 0.1, // 90% chance of being in stock
          stockCount: foundProduct.stockCount || Math.floor(Math.random() * 50) + 5,
          shipping: {
            free: foundProduct.price > 50,
            estimatedDays: Math.floor(Math.random() * 5) + 1,
            express: true
          },
          features: foundProduct.features || [
            'Premium Quality Materials',
            'Latest Technology',
            'Energy Efficient',
            'Ergonomic Design',
            'Long-lasting Durability'
          ]
        };

        setProduct(enhancedProduct);

        // Fetch related products
        const relatedProductsData = await generateRelatedProducts(enhancedProduct);
        setRelatedProducts(relatedProductsData);

        // Fetch reviews
        await fetchReviews(id);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || err.message || 'Product not found');
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-[#0C2F4F]/20'
        }`}
      />
    ));
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (product && user) {
      addToCart(product, selectedQuantity);
      setCartMessage('Product added to cart successfully!');

      // Hide success message after 3 seconds
      setTimeout(() => {
        setCartMessage('');
      }, 3000);
    } else if (!user) {
      setCartMessage('Please login to add items to cart');
      setTimeout(() => {
        setCartMessage('');
      }, 3000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Fetch reviews for the product
  const fetchReviews = async (productId) => {
    try {
      setReviewsLoading(true);
      const response = await reviewAPI.getProductReviews(productId);
      setReviews(response.data.reviews || []);
      setNotesList(response.data.reviews || []); // Keep compatibility with existing display
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
      setNotesList([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await reviewAPI.deleteReview(id, reviewId);
      await fetchReviews(id); // Refresh reviews
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
  };

  // Mark review as helpful
  const handleMarkHelpful = async (reviewId) => {
    try {
      await reviewAPI.markReviewHelpful(id, reviewId);
      await fetchReviews(id); // Refresh reviews to show updated helpful count
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  const handleAddNote = async () => {
    if (!note.trim() || !user) {
      return;
    }

    try {
      setIsLoading(true);

      const reviewData = {
        userName: user.displayName || user.name || 'Anonymous User',
        userEmail: user.email,
        userPhoto: user.photoURL || '',
        rating: userRating,
        comment: note.trim(),
        verified: true // You can implement verification logic
      };

      // Submit review to API
      await reviewAPI.addReview(id, reviewData);

      // Clear form
      setNote('');
      setUserRating(0);
      setReviewSubmitted(true);

      // Refresh reviews
      await fetchReviews(id);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setReviewSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F] flex justify-center items-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#0C2F4F] animate-spin mx-auto mb-4" />
        <p className="text-lg text-[#0C2F4F]">Loading product details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F]">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-lg text-red-700 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-[#0D3050] text-white rounded-lg hover:bg-[#0A2540] transition-colors"
            >
              Back to Products
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-[#0D3050] text-[#0D3050] rounded-lg hover:bg-[#0D3050]/5 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F]">
      <div className="container mx-auto px-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Warning: </strong>
          <span className="block sm:inline">Product not found</span>
        </div>
      </div>
    </div>
  );

  const IconComponent = getCategoryIcon(product.category);

  return (
    <>
      <SEO
        title={`${product.name} - Buy at Best Price | jTech`}
        description={`${product.description?.substring(0, 155) || `Buy ${product.name} at jTech. ${product.category} with great features and competitive pricing.`}`}
        keywords={`${product.name}, buy ${product.category}, ${product.brand || 'tech products'}, ${product.category} for sale, jTech products`}
        url={`https://jtechvision.com/product/${id}`}
        ogImage={product.image || 'https://jtechvision.com/og-products.jpg'}
        twitterImage={product.image || 'https://jtechvision.com/twitter-products.jpg'}
        type="product"
      />
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F] overflow-hidden relative">
      {/* Background Pattern Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(12,47,79,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-[#0D3050] hover:text-[#0C2F4F] transition-colors">Home</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-[#0C2F4F]/40" />
            <Link to="/products" className="text-[#0D3050] hover:text-[#0C2F4F] transition-colors">Products</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-[#0C2F4F]/40" />
            <span className="text-[#0C2F4F]/60 truncate max-w-xs">{product.name}</span>
          </div>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mt-2 flex items-center space-x-2 text-[#0C2F4F]/70 hover:text-[#0C2F4F] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>
        </nav>

        {/* Main Product Section */}
        <div className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 rounded-xl shadow-lg hover:shadow-[#0C2F4F]/20 overflow-hidden mb-6">
          <div className="lg:flex">
            {/* Product Image */}
            <div className="lg:w-1/2 relative">
              <div className="w-full h-64 lg:h-full bg-gradient-to-br from-[#0C2F4F]/5 via-[#0C2F4F]/5 to-[#0C2F4F]/10 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full bg-gradient-to-br from-[#0C2F4F]/5 via-[#0C2F4F]/5 to-[#0C2F4F]/10 flex items-center justify-center" style={{display: product.image ? 'none' : 'flex'}}>
                  <IconComponent className="w-20 h-20 text-[#0C2F4F]/60" />
                </div>
              </div>
              <div className="absolute top-4 right-4 space-y-2">
                {product.price > 1000 && (
                  <span className="block bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Premium
                  </span>
                )}
                {product.price > 500 && product.price <= 1000 && (
                  <span className="block bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Popular
                  </span>
                )}
                {product.price <= 500 && (
                  <span className="block bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Budget
                  </span>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block px-2 py-1 bg-[#0C2F4F]/10 border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-xs font-medium capitalize">
                  {product.category}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={handleToggleFavorite}
                    className={`p-1.5 rounded-full transition-colors ${
                      isFavorite ? 'bg-red-100 text-red-600' : 'bg-[#0C2F4F]/10 text-[#0C2F4F]/60 hover:bg-red-100 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-full bg-[#0C2F4F]/10 text-[#0C2F4F]/60 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-2">
                <span className="text-xs text-[#0C2F4F]/60 font-semibold uppercase tracking-wide">
                  {product.brand}
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-[#0C2F4F] mb-3">{product.name}</h1>

              {/* Rating and Reviews */}
              <div className="flex items-center mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>

              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-[#0D3050]">TK{product.price}</span>
                {product.price > 100 && (
                  <span className="text-sm text-[#0C2F4F]/40 line-through ml-2">
                    TK{Math.round(product.price * 1.2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.inStock ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                        In Stock
                      </span>
                    </div>
                    <p className="text-green-700 text-xs">
                      {product.stockCount} units available
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
                        Out of Stock
                      </span>
                    </div>
                    <p className="text-red-700 text-xs">
                      This item is currently unavailable. Check back soon!
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping Info */}
              <div className="mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Package className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-[#0C2F4F] text-sm">Shipping Information</span>
                  </div>
                  <div className="space-y-1 text-xs text-[#0C2F4F]/70">
                    <p>{product.shipping.free ? 'Free Shipping' : 'Shipping charges apply'}</p>
                    <p>Estimated delivery: {product.shipping.estimatedDays} business days</p>
                    {product.shipping.express && <p>Express delivery available</p>}
                  </div>
                </div>
              </div>

              {/* Cart Success/Error Message */}
              {cartMessage && (
                <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
                  cartMessage.includes('successfully')
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                }`}>
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{cartMessage}</span>
                </div>
              )}

              {/* Quantity Selector and Add to Cart */}
              {product.inStock && user && (
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center border border-[#0C2F4F]/20 rounded-lg">
                    <button
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="px-2 py-1 text-[#0C2F4F]/60 hover:bg-[#0C2F4F]/10 transition-colors text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-medium text-[#0C2F4F] text-sm">{selectedQuantity}</span>
                    <button
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="px-2 py-1 text-[#0C2F4F]/60 hover:bg-[#0C2F4F]/10 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition-colors text-sm ${
                      isInCart(product._id)
                        ? 'bg-green-600 text-white'
                        : 'bg-[#0D3050] hover:bg-[#0A2540] text-white'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{isInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}</span>
                  </button>
                </div>
              )}

              {/* Login message for non-logged in users */}
              {product.inStock && !user && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <Link to="/login" className="font-semibold hover:underline">Login</Link> to add items to your cart
                  </p>
                </div>
              )}

              {/* Buy Now Button */}
              {product.inStock && (
                <button
                  onClick={() => navigate(`/buy-product/${product._id}`)}
                  className="w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-[#0D3050] to-[#0C2F4F] hover:from-[#0A2540] hover:to-[#0A2540] text-white focus:ring-[#0D3050] text-sm"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 rounded-2xl shadow-xl hover:shadow-[#0C2F4F]/20 overflow-hidden mb-8">
          <div className="border-b border-[#0C2F4F]/20">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 font-medium transition-colors duration-200 ${
                  activeTab === 'description'
                    ? 'border-b-2 border-[#0D3050] text-[#0D3050]'
                    : 'text-[#0C2F4F]/70 hover:text-[#0C2F4F] border-b-2 border-transparent'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('techspecs')}
                className={`py-4 font-medium transition-colors duration-200 ${
                  activeTab === 'techspecs'
                    ? 'border-b-2 border-[#0D3050] text-[#0D3050]'
                    : 'text-[#0C2F4F]/70 hover:text-[#0C2F4F] border-b-2 border-transparent'
                }`}
              >
                Tech Specs
              </button>
              <button
                onClick={() => setActiveTab('warranty')}
                className={`py-4 font-medium transition-colors duration-200 ${
                  activeTab === 'warranty'
                    ? 'border-b-2 border-[#0D3050] text-[#0D3050]'
                    : 'text-[#0C2F4F]/70 hover:text-[#0C2F4F] border-b-2 border-transparent'
                }`}
              >
                Warranty
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 font-medium transition-colors duration-200 ${
                  activeTab === 'features'
                    ? 'border-b-2 border-[#0D3050] text-[#0D3050]'
                    : 'text-[#0C2F4F]/70 hover:text-[#0C2F4F] border-b-2 border-transparent'
                }`}
              >
                Features
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-[#0C2F4F]">
                  <Info className="w-5 h-5 mr-2 text-[#0D3050]" />
                  Product Description
                </h3>
                <p className="text-[#0C2F4F]/70 leading-relaxed text-lg">{product.description}</p>
              </div>
            )}

            {/* Tech Specs Tab */}
            {activeTab === 'techspecs' && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-6 flex items-center text-[#0C2F4F]">
                  <Package className="w-5 h-5 mr-2 text-[#0D3050]" />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.techSpecs).map(([key, value]) => (
                    <div key={key} className="bg-[#0C2F4F]/5 p-4 rounded-lg border border-[#0C2F4F]/10">
                      <div className="flex flex-col space-y-1">
                        <span className="font-semibold text-[#0C2F4F]/80 text-sm uppercase tracking-wide">
                          {key.replace('_', ' ')}
                        </span>
                        <span className="text-[#0C2F4F] font-medium">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warranty Tab */}
            {activeTab === 'warranty' && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-6 flex items-center text-[#0C2F4F]">
                  <CheckCircle className="w-5 h-5 mr-2 text-[#0D3050]" />
                  Warranty & Support
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Standard Warranty</h4>
                      <p className="text-green-700 text-sm">{product.warranty.standard}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Extended Warranty</h4>
                      <p className="text-blue-700 text-sm">{product.warranty.extended}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Coverage</h4>
                      <p className="text-purple-700 text-sm">{product.warranty.coverage}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Customer Support</h4>
                      <p className="text-orange-700 text-sm">{product.warranty.support}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Return Policy</h4>
                      <p className="text-yellow-700 text-sm">{product.warranty.returns}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Repairs</h4>
                      <p className="text-gray-700 text-sm">{product.warranty.repairs}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-6 flex items-center text-[#0C2F4F]">
                  <Star className="w-5 h-5 mr-2 text-[#0D3050]" />
                  Key Features & Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-[#0C2F4F]/5 rounded-lg border border-[#0C2F4F]/10 hover:bg-[#0C2F4F]/10 transition-colors duration-200">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[#0C2F4F]/80 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Additional Features Section */}
                <div className="mt-8 pt-6 border-t border-[#0C2F4F]/20">
                  <h4 className="text-lg font-semibold mb-4 text-[#0C2F4F]">Why Choose This Product?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h5 className="font-semibold text-blue-800 mb-1">Premium Quality</h5>
                      <p className="text-blue-700 text-sm">Built with high-quality materials and components</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h5 className="font-semibold text-green-800 mb-1">Reliable Performance</h5>
                      <p className="text-green-700 text-sm">Consistent and dependable operation</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h5 className="font-semibold text-purple-800 mb-1">User Friendly</h5>
                      <p className="text-purple-700 text-sm">Easy to use and maintain</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 rounded-2xl shadow-xl hover:shadow-[#0C2F4F]/20 overflow-hidden mb-8">
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-6 text-[#0C2F4F]">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const RelatedIcon = getCategoryIcon(relatedProduct.category);
                return (
                  <Link
                    key={relatedProduct._id}
                    to={`/product/${relatedProduct._id}`}
                    className="group block bg-brand-light/50 border border-[#0C2F4F]/10 rounded-lg overflow-hidden hover:shadow-md hover:border-[#0C2F4F]/30 transition-all duration-300"
                  >
                    <div className="h-40 bg-gradient-to-br from-[#0C2F4F]/5 via-[#0C2F4F]/5 to-[#0C2F4F]/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {relatedProduct.image ? (
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full flex items-center justify-center" style={{display: relatedProduct.image ? 'none' : 'flex'}}>
                        <RelatedIcon className="w-12 h-12 text-[#0C2F4F]/60" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-[#0C2F4F] mb-2">{relatedProduct.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#0D3050]">TK{relatedProduct.price}</span>
                        <div className="flex items-center">
                          {renderStars(relatedProduct.rating)}
                          <span className="ml-1 text-sm text-[#0C2F4F]/60">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SingleProduct;