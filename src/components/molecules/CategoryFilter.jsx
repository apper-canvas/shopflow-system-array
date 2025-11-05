import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const categories = [
  { value: "all", label: "All Products", icon: "Grid3X3" },
  { value: "Electronics", label: "Electronics", icon: "Smartphone" },
  { value: "Fashion", label: "Fashion", icon: "Shirt" },
  { value: "Home", label: "Home", icon: "Home" },
  { value: "Sports", label: "Sports", icon: "Zap" }
];

const CategoryFilter = ({ selectedCategory, onCategoryChange, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "primary" : "outline"}
          size="md"
          onClick={() => onCategoryChange(category.value)}
          icon={category.icon}
          className="flex-shrink-0"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;