import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state && location.state.order) {
      setOrder(location.state.order);
    } else {
      // If no order data, redirect to home
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin">
          <ApperIcon name="Loader2" size={32} className="text-primary" />
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-success/20 to-success/30 p-8 rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-6">
          <ApperIcon name="CheckCircle" size={64} className="text-success" />
        </div>
        
        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your purchase, {order.customerInfo.name}!
        </p>
        
        <p className="text-gray-500">
          Your order has been successfully placed and is being processed.
        </p>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Order Info */}
        <Card className="p-6 text-left">
          <h2 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Package" size={20} className="mr-2 text-primary" />
            Order Information
          </h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">#{order.Id.toString().padStart(6, "0")}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{formatDate(order.orderDate)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium capitalize text-success">{order.status}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{order.customerInfo.email}</span>
            </div>
          </div>
        </Card>

        {/* Shipping Info */}
        <Card className="p-6 text-left">
          <h2 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Truck" size={20} className="mr-2 text-primary" />
            Shipping Address
          </h2>
          
          <div className="text-sm text-gray-600">
            <div className="font-medium text-gray-900 mb-1">{order.customerInfo.name}</div>
            <div>{order.customerInfo.address}</div>
          </div>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg">
            <div className="flex items-center text-sm text-secondary font-medium">
              <ApperIcon name="Clock" size={16} className="mr-2" />
              Estimated delivery: 3-5 business days
            </div>
          </div>
        </Card>
      </div>

      {/* Order Items */}
      <Card className="p-6 text-left mb-8">
        <h2 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="ShoppingBag" size={20} className="mr-2 text-primary" />
          Order Items ({order.items.length})
        </h2>
        
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-b-0">
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
                  {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                  {item.selectedColor && <div>Color: {item.selectedColor}</div>}
                  <div>Quantity: {item.quantity}</div>
                </div>
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
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between text-xl font-display font-bold text-gray-900">
            <span>Total Paid:</span>
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/")}
          icon="ArrowLeft"
        >
          Continue Shopping
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.print()}
          icon="Download"
        >
          Print Receipt
        </Button>
      </div>

      {/* Support Note */}
      <div className="mt-8 p-4 bg-gradient-to-r from-info/10 to-secondary/10 rounded-xl">
        <div className="flex items-center justify-center mb-2">
          <ApperIcon name="HeadphonesIcon" size={20} className="mr-2 text-info" />
          <span className="font-medium text-gray-900">Need Help?</span>
        </div>
        <p className="text-sm text-gray-600">
          If you have any questions about your order, please contact our customer support team.
          We're here to help!
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;