import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/organisms/ProductGrid";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import productService from "@/services/api/productService";

const ProductCatalog = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "all");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      
      let result;
      
      if (searchQuery) {
        result = await productService.search(searchQuery);
      } else if (selectedCategory === "all") {
        result = await productService.getAll();
      } else {
        result = await productService.getByCategory(selectedCategory);
      }
      
      setProducts(result);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedCategory(category || "all");
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    if (newCategory === "all") {
      window.history.pushState({}, "", "/");
    } else {
      window.history.pushState({}, "", `/category/${newCategory}`);
    }
  };

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (selectedCategory === "all") {
      return "All Products";
    }
    return selectedCategory;
  };

  const getPageSubtitle = () => {
    if (searchQuery) {
      return `Found ${products.length} products matching your search`;
    }
    return `Discover our collection of ${selectedCategory.toLowerCase() === "all" ? "" : selectedCategory.toLowerCase()} products`;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
          {getPageTitle()}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {getPageSubtitle()}
        </p>
      </div>

      {/* Category Filter */}
      {!searchQuery && (
        <div className="flex justify-center">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      )}

      {/* Products Count */}
      {!loading && !error && (
        <div className="text-center">
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? "product" : "products"} found
          </p>
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        onRetry={loadProducts}
      />
    </div>
  );
};

export default ProductCatalog;