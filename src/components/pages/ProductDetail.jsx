import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import productService from "@/services/api/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await productService.getById(id);
      setProduct(result);
      
      // Set default selections
      if (result.sizes && result.sizes.length > 0) {
        setSelectedSize(result.sizes[0]);
      }
      if (result.colors && result.colors.length > 0) {
        setSelectedColor(result.colors[0]);
      }
    } catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-200 aspect-square rounded-xl"></div>
          <div className="space-y-4">
            <div className="bg-gray-200 h-8 rounded w-3/4"></div>
            <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            <div className="bg-gray-200 h-24 rounded"></div>
            <div className="bg-gray-200 h-12 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={loadProduct}
        className="max-w-2xl mx-auto"
      />
    );
  }

  if (!product) {
    return (
      <Error
        message="Product not found"
        onRetry={() => navigate("/")}
        className="max-w-2xl mx-auto"
      />
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <ApperIcon key={i} name="Star" size={20} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <ApperIcon key="half" name="StarHalf" size={20} className="text-accent fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <ApperIcon key={`empty-${i}`} name="Star" size={20} className="text-gray-300" />
      );
    }

    return stars;
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          icon="ArrowLeft"
        >
          Back to Products
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </Card>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" size="sm">
                {product.category}
              </Badge>
              {product.stock <= 10 && (
                <Badge variant="warning" size="sm">
                  Low Stock
                </Badge>
              )}
              {product.rating >= 4.8 && (
                <Badge variant="success" size="sm">
                  <ApperIcon name="Star" size={12} className="mr-1" />
                  Bestseller
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="text-4xl font-display font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">
              {formatPrice(product.price)}
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color: {selectedColor}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedColor === color
                        ? "bg-secondary text-white border-secondary"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-3 py-2 rounded-r-none border-r border-gray-300"
              >
                <ApperIcon name="Minus" size={16} />
              </Button>
              
              <span className="px-4 py-2 font-medium min-w-[60px] text-center">
                {quantity}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="px-3 py-2 rounded-l-none border-l border-gray-300"
              >
                <ApperIcon name="Plus" size={16} />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {product.stock} items available
            </p>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <Button
              variant="primary"
              size="xl"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full"
              icon="ShoppingCart"
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" size="lg" className="w-full" icon="Heart">
                Save for Later
              </Button>
              <Button variant="outline" size="lg" className="w-full" icon="Share2">
                Share Product
              </Button>
            </div>
          </div>

          {/* Product Features */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Truck" size={16} className="mr-2 text-secondary" />
                Free Shipping
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="RotateCcw" size={16} className="mr-2 text-secondary" />
                30-Day Returns
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Shield" size={16} className="mr-2 text-secondary" />
                1-Year Warranty
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;