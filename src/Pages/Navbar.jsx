import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Menu, X, LogOut, User, BarChart3, Package, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthContext';
import { useCart } from '../Context/CartContext';
import logo from '../images/logo.png';
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { user, logOut, loading, userRole } = useAuth();
  const { cartItems, cartCount, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // Hide when scrolling down, show when scrolling up
        setIsVisible(lastScrollY > currentScrollY);
      }

      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Check for user authentication state
  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      } else {
        setCurrentUser(null);
      }
    };

    // Check on mount
    checkUser();

    // Listen for login/logout events
    const handleUserLogin = (event) => {
      setCurrentUser(event.detail);
    };

    const handleUserLogout = () => {
      setCurrentUser(null);
    };

    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('userLogout', handleUserLogout);

    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      setIsAvatarOpen(false);

      // Dispatch logout event
      window.dispatchEvent(new CustomEvent('userLogout'));

      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrollY > 50
        ? 'bg-brand-light/90 backdrop-blur-xl shadow-2xl border-b border-[#0C2F4F]/20'
        : 'bg-gradient-to-r from-brand-light via-brand-light to-brand-light'
    } ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">

          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer" aria-label="Go to homepage">
            <img src={logo} alt="jTech Logo" className="w-20 h-20" />
            <span className="text-3xl font-bold bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent tracking-tight">
              jTech
            </span>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-12">
            <div className="flex items-center space-x-12">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'Services', path: '/services' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group text-[#0C2F4F] hover:text-[#0C2F4F] transition-all duration-300 text-lg font-medium tracking-wide"
                >
                  <span className="relative z-10 font-serif">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] group-hover:w-full transition-all duration-300 rounded-full"></div>
                  <div className="absolute -inset-2 bg-[#0C2F4F]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Cart and Login Button or User Avatar */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart Icon - Only show when user is logged in */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2 rounded-full hover:bg-[#0C2F4F]/10 transition-all duration-300 group"
                >
                  <ShoppingCart className="w-6 h-6 text-[#0C2F4F] group-hover:text-[#0C2F4F]/80 transition-colors duration-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#0C2F4F]/20 py-4 z-50 max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-[#0C2F4F]/10">
                      <h3 className="text-lg font-semibold text-[#0C2F4F]">Shopping Cart ({cartCount})</h3>
                    </div>

                    {cartItems.length > 0 ? (
                      <>
                        <div className="py-2 max-h-64 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div key={item._id} className="px-4 py-3 border-b border-[#0C2F4F]/5 last:border-b-0">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0C2F4F]/5 to-[#0C2F4F]/10 rounded-lg flex items-center justify-center">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover rounded-lg"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                      }}
                                    />
                                  ) : null}
                                  <div className="w-full h-full flex items-center justify-center" style={{display: item.image ? 'none' : 'flex'}}>
                                    <Package className="w-6 h-6 text-[#0C2F4F]/60" />
                                  </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-[#0C2F4F] truncate">{item.name}</h4>
                                  <p className="text-xs text-[#0C2F4F]/60">TK{item.price}</p>

                                  <div className="flex items-center space-x-2 mt-1">
                                    <button
                                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                      className="w-6 h-6 rounded-full bg-[#0C2F4F]/10 flex items-center justify-center hover:bg-[#0C2F4F]/20 transition-colors"
                                    >
                                      <Minus className="w-3 h-3 text-[#0C2F4F]" />
                                    </button>
                                    <span className="text-sm font-medium text-[#0C2F4F] min-w-[20px] text-center">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                      className="w-6 h-6 rounded-full bg-[#0C2F4F]/10 flex items-center justify-center hover:bg-[#0C2F4F]/20 transition-colors"
                                    >
                                      <Plus className="w-3 h-3 text-[#0C2F4F]" />
                                    </button>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <p className="text-sm font-semibold text-[#0C2F4F]">TK{(item.price * item.quantity).toFixed(2)}</p>
                                  <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-500 hover:text-red-700 transition-colors mt-1"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="px-4 py-3 border-t border-[#0C2F4F]/10">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-semibold text-[#0C2F4F]">Total:</span>
                            <span className="text-lg font-bold text-[#0C2F4F]">TK{getCartTotal().toFixed(2)}</span>
                          </div>
                          <button
                            onClick={() => {
                              navigate('/checkout', { state: { cartItems, cartTotal: getCartTotal() } });
                              setIsCartOpen(false);
                            }}
                            className="w-full bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F]/80 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                          >
                            Checkout
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <ShoppingCart className="w-12 h-12 text-[#0C2F4F]/40 mx-auto mb-3" />
                        <p className="text-[#0C2F4F]/60">Your cart is empty</p>
                        <Link
                          to="/products"
                          onClick={() => setIsCartOpen(false)}
                          className="text-[#0C2F4F] hover:text-[#0C2F4F]/80 text-sm font-medium mt-2 inline-block"
                        >
                          Browse Products
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* User Avatar or Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                  className="flex items-center space-x-3 p-2 rounded-full hover:bg-[#0C2F4F]/10 transition-all duration-300 group"
                >
                  {/* Avatar on the left */}
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#0C2F4F]/20 group-hover:border-[#0C2F4F]/40 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F]/80 flex items-center justify-center text-white font-bold text-sm group-hover:shadow-lg transition-all duration-300">
                      {getUserInitials(currentUser.name)}
                    </div>
                  )}
                  {/* User name in the middle */}
                  <span className="text-[#0C2F4F] font-medium font-serif group-hover:text-[#0C2F4F]/80 transition-colors duration-300">
                    {currentUser.name}
                  </span>
                  {/* Dropdown chevron on the right */}
                  <ChevronRight className={`w-4 h-4 text-[#0C2F4F] transition-transform duration-300 ${isAvatarOpen ? 'rotate-90' : ''} group-hover:text-[#0C2F4F]/80`} />
                </button>

                {/* Avatar Dropdown */}
                {isAvatarOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#0C2F4F]/20 py-2 z-50">
                    <div className="px-4 py-3 border-b border-[#0C2F4F]/10">
                      <p className="text-sm font-medium text-[#0C2F4F]">{currentUser.name}</p>
                      <p className="text-xs text-[#0C2F4F]/70">{currentUser.email}</p>
                      <p className="text-xs text-[#0C2F4F]/50 capitalize">{currentUser.role} Account</p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-[#0C2F4F] hover:bg-[#0C2F4F]/10 transition-all duration-200"
                        onClick={() => setIsAvatarOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="font-medium">Profile</span>
                      </Link>

                      {userRole === 'admin' && (
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 px-4 py-2 text-[#0C2F4F] hover:bg-[#0C2F4F]/10 transition-all duration-200"
                          onClick={() => setIsAvatarOpen(false)}
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span className="font-medium">Dashboard</span>
                        </Link>
                      )}

                      {userRole !== 'admin' && (
                        <Link
                          to="/track-order"
                          className="flex items-center space-x-3 px-4 py-2 text-[#0C2F4F] hover:bg-[#0C2F4F]/10 transition-all duration-200"
                          onClick={() => setIsAvatarOpen(false)}
                        >
                          <Package className="w-4 h-4" />
                          <span className="font-medium">Track Order</span>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="relative group overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-8 py-3 rounded-full font-bold text-lg tracking-wide shadow-lg hover:shadow-[#0C2F4F]/30 transition-all duration-300 hover:scale-105 inline-flex items-center"
              >
                <span className="relative z-10 font-serif">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative group p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="absolute inset-0 bg-[#0C2F4F]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isMenuOpen ? (
              <X className="w-7 h-7 text-[#0C2F4F] relative z-10 transform rotate-180 transition-transform duration-300" />
            ) : (
              <Menu className="w-7 h-7 text-[#0C2F4F] relative z-10 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-brand-light/90 to-brand-light/90 backdrop-blur-xl rounded-2xl mt-4 mb-6 p-6 border border-[#0C2F4F]/20 shadow-2xl">
            <div className="flex flex-col space-y-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'Services', path: '/services' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group text-[#0C2F4F] hover:text-[#0C2F4F] transition-all duration-300 text-lg font-medium tracking-wide font-serif py-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] group-hover:w-full transition-all duration-300 rounded-full"></div>
                </Link>
              ))}

              {/* Mobile Cart Section - Only show when user is logged in */}
              {currentUser && (
                <div className="mt-4 p-4 bg-[#0C2F4F]/10 rounded-xl">
                  <button
                    onClick={() => {
                      setIsCartOpen(!isCartOpen);
                    }}
                    className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="w-5 h-5 text-[#0C2F4F]" />
                      <span className="font-medium text-[#0C2F4F]">Shopping Cart</span>
                    </div>
                    {cartCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
                  </button>

                  {/* Mobile Cart Dropdown */}
                  {isCartOpen && (
                    <div className="mt-3 bg-white rounded-lg shadow-lg border border-[#0C2F4F]/20 overflow-hidden">
                      {cartItems.length > 0 ? (
                        <>
                          <div className="max-h-48 overflow-y-auto">
                            {cartItems.map((item) => (
                              <div key={item._id} className="p-3 border-b border-[#0C2F4F]/10 last:border-b-0">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-[#0C2F4F]/10 rounded-lg flex items-center justify-center">
                                    {item.image ? (
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-lg"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                          e.target.nextSibling.style.display = 'flex';
                                        }}
                                      />
                                    ) : null}
                                    <div className="w-full h-full flex items-center justify-center" style={{display: item.image ? 'none' : 'flex'}}>
                                      <Package className="w-5 h-5 text-[#0C2F4F]/60" />
                                    </div>
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-[#0C2F4F] truncate">{item.name}</h4>
                                    <p className="text-xs text-[#0C2F4F]/60">TK{item.price} x {item.quantity}</p>
                                  </div>

                                  <div className="text-right">
                                    <p className="text-sm font-semibold text-[#0C2F4F]">TK{(item.price * item.quantity).toFixed(2)}</p>
                                    <button
                                      onClick={() => removeFromCart(item._id)}
                                      className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-3 bg-[#0C2F4F]/5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-[#0C2F4F]">Total:</span>
                              <span className="font-bold text-[#0C2F4F]">TK{getCartTotal().toFixed(2)}</span>
                            </div>
                            <button
                              onClick={() => {
                                navigate('/checkout', { state: { cartItems, cartTotal: getCartTotal() } });
                                setIsCartOpen(false);
                                setIsMenuOpen(false);
                              }}
                              className="w-full bg-[#0C2F4F] text-white py-2 rounded-lg font-semibold hover:bg-[#0C2F4F]/90 transition-all duration-300"
                            >
                              Checkout
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center">
                          <ShoppingCart className="w-8 h-8 text-[#0C2F4F]/40 mx-auto mb-2" />
                          <p className="text-[#0C2F4F]/60 text-sm">Your cart is empty</p>
                          <Link
                            to="/products"
                            onClick={() => {
                              setIsCartOpen(false);
                              setIsMenuOpen(false);
                            }}
                            className="text-[#0C2F4F] hover:text-[#0C2F4F]/80 text-sm font-medium mt-2 inline-block"
                          >
                            Browse Products
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Login/User Section */}
              {currentUser ? (
                <div className="mt-4 p-4 bg-[#0C2F4F]/10 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#0C2F4F]/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F]/80 flex items-center justify-center text-white font-bold text-sm">
                        {getUserInitials(currentUser.name)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-[#0C2F4F]">{currentUser.name}</p>
                      <p className="text-xs text-[#0C2F4F]/70">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="block w-full text-left p-2 text-[#0C2F4F] hover:bg-[#0C2F4F]/10 rounded-lg transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>

                    {userRole === 'admin' && (
                      <Link
                        to="/dashboard"
                        className="block w-full text-left p-2 text-[#0C2F4F] hover:bg-[#0C2F4F]/10 rounded-lg transition-all duration-200 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}

                    {userRole !== 'admin' && (
                      <Link
                        to="/track-order"
                        className="block w-full text-left p-2 text-[#0C2F4F] hover:bg-[#0C2F4F]/10 rounded-lg transition-all duration-200 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Track Order
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <Link
                    to="/login"
                    className="block w-full bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-8 py-4 rounded-full font-bold text-lg tracking-wide shadow-lg hover:shadow-[#0C2F4F]/30 transition-all duration-300 hover:scale-105 font-serif text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="inline-flex items-center justify-center">
                      Login
                      <ArrowRight className="inline-block w-5 h-5 ml-2" />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};