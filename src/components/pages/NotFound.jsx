import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, ShoppingBag } from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const popularCategories = [
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Clothing', path: '/category/clothing' },
    { name: 'Home & Garden', path: '/category/home-garden' },
    { name: 'Sports', path: '/category/sports' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-primary/20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-surface rounded-full p-6 shadow-card">
              <ShoppingBag className="h-12 w-12 text-primary" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="text-gray-600 font-body text-lg leading-relaxed">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back to shopping!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGoHome}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-card-hover flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex-1 border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="pt-8 border-t border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Search className="h-4 w-4" />
              <span className="text-sm font-medium">Popular Categories</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {popularCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => navigate(category.path)}
                  className="text-sm text-gray-600 hover:text-primary py-2 px-3 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="pt-4">
          <p className="text-xs text-gray-400 font-body">
            If you believe this is an error, please contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}