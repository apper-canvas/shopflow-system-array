import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import orderService from "@/services/api/orderService";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const orderData = {
        items: cartItems,
        total: getCartTotal(),
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
        }
      };

      const order = await orderService.create(orderData);
      
      // Clear cart and navigate to confirmation
      clearCart();
      navigate("/order-confirmation", { state: { order } });
      
      toast.success("Order placed successfully!");
      
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Checkout
        </h1>
        <p className="text-gray-600">
          Complete your order and get your items delivered to your door.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="Truck" size={24} className="mr-2 text-primary" />
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                required
              />
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />
              
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                required
              />
              
              <div></div>
              
              <Input
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                error={errors.address}
                className="sm:col-span-2"
                required
              />
              
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                error={errors.city}
                required
              />
              
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                error={errors.state}
                required
              />
              
              <Input
                label="ZIP Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                error={errors.zipCode}
                required
              />
            </div>
          </Card>

          {/* Payment Information */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="CreditCard" size={24} className="mr-2 text-primary" />
              Payment Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                error={errors.cardNumber}
                placeholder="1234 5678 9012 3456"
                className="sm:col-span-2"
                required
              />
              
              <Input
                label="Expiry Date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                error={errors.expiryDate}
                placeholder="MM/YY"
                required
              />
              
              <Input
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                error={errors.cvv}
                placeholder="123"
                required
              />
              
              <Input
                label="Cardholder Name"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                error={errors.cardName}
                className="sm:col-span-2"
                required
              />
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={`${item.productId}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {item.name}
                    </h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                      {item.selectedColor && <div>Color: {item.selectedColor}</div>}
                      <div>Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-primary">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              
              <div className="flex justify-between text-lg font-display font-bold text-gray-900 border-t border-gray-200 pt-3">
                <span>Total</span>
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-6"
              icon="CreditCard"
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>

            {/* Security Note */}
            <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
              <ApperIcon name="Shield" size={16} className="mr-2" />
              Your payment information is secure and encrypted
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Checkout;