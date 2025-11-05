import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Login from "@/components/pages/Login";
import SearchBar from "@/components/molecules/SearchBar";
import { useAuth } from "@/layouts/Root";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { logout } = useAuth();

  const cartItemCount = getCartItemCount();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/");
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/category/Electronics", label: "Electronics" },
    { path: "/category/Fashion", label: "Fashion" },
    { path: "/category/Home", label: "Home" },
    { path: "/category/Sports", label: "Sports" }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40 shadow-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
              <ApperIcon name="ShoppingBag" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ShopFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Actions */}
<div className="flex items-center space-x-4">
            {/* Search Button - Mobile */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm">
                <ApperIcon name="Search" size={20} />
              </Button>
            </div>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ApperIcon name="ShoppingCart" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-primary/90 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-count">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline text-sm text-gray-600">
                  Welcome, {user?.firstName || user?.name || 'User'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                >
                  <ApperIcon name="LogOut" size={20} />
                  <span className="hidden sm:inline ml-2">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  <ApperIcon name="LogIn" size={20} />
                  <span className="hidden sm:inline ml-2">Login</span>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium py-2 px-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Auth Menu Items */}
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-medium py-2 px-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-medium py-2 px-3 rounded-lg transition-colors bg-primary text-white hover:bg-primary/90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="font-medium py-2 px-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 text-left"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
};

export default Header;