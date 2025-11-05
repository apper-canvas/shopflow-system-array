import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-6 rounded-full mb-6">
        <ApperIcon name="AlertCircle" size={48} className="text-primary" />
      </div>
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" size="lg">
          <ApperIcon name="RotateCcw" size={20} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;