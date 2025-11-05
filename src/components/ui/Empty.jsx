import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Try adjusting your search or filters to find what you're looking for.",
  actionLabel = "Browse All Products",
  onAction,
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <div className="bg-gradient-to-br from-secondary/10 to-accent/10 p-8 rounded-full mb-6">
        <ApperIcon name="Package" size={64} className="text-secondary" />
      </div>
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} variant="primary" size="lg">
          <ApperIcon name="ShoppingBag" size={20} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;