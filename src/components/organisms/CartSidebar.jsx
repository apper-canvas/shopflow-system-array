import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import CartItem from "@/components/molecules/CartItem";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";

const CartSidebar = () => {
  const navigate = useNavigate();
  const { cartItems, isCartOpen, setIsCartOpen, getCartTotal } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    navigate("/");
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-display font-semibold text-gray-900">
              Shopping Cart ({cartItems.length})
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(false)}
              className="p-2"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="bg-gradient-to-br from-secondary/10 to-accent/10 p-8 rounded-full mb-6">
                  <ApperIcon name="ShoppingCart" size={48} className="text-secondary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Discover amazing products and start shopping!
                </p>
                <Button
                  variant="primary"
                  onClick={handleContinueShopping}
                  icon="ArrowLeft"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="p-6">
                {cartItems.map((item, index) => (
                  <CartItem key={`${item.productId}-${item.selectedSize}-${item.selectedColor}-${index}`} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-display font-semibold text-gray-900">
                  Total:
                </span>
                <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {formatPrice(getCartTotal())}
                </span>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCheckout}
                  className="w-full"
                  icon="CreditCard"
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleContinueShopping}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;