import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.productId, item.selectedSize, item.selectedColor);
    } else {
      updateQuantity(item.productId, item.selectedSize, item.selectedColor, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">
          {item.name}
        </h4>
        
        <div className="text-sm text-gray-500 space-y-1">
          {item.selectedSize && (
            <div>Size: {item.selectedSize}</div>
          )}
          {item.selectedColor && (
            <div>Color: {item.selectedColor}</div>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-2 py-1 h-8 w-8"
            >
              <ApperIcon name="Minus" size={14} />
            </Button>
            
            <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
              {item.quantity}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-2 py-1 h-8 w-8"
              disabled={item.quantity >= item.stock}
            >
              <ApperIcon name="Plus" size={14} />
            </Button>
          </div>

          <div className="text-right">
            <div className="font-semibold text-primary">
              {formatPrice(item.price * item.quantity)}
            </div>
            {item.quantity > 1 && (
              <div className="text-xs text-gray-500">
                {formatPrice(item.price)} each
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeFromCart(item.productId, item.selectedSize, item.selectedColor)}
        className="shrink-0 text-gray-400 hover:text-error p-2"
      >
        <ApperIcon name="Trash2" size={16} />
      </Button>
    </div>
  );
};

export default CartItem;