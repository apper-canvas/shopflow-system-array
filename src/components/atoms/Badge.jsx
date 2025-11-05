import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  size = "md", 
  className = "",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/20 to-primary/30 text-primary",
    secondary: "bg-gradient-to-r from-secondary/20 to-secondary/30 text-secondary",
    success: "bg-gradient-to-r from-success/20 to-success/30 text-success",
    warning: "bg-gradient-to-r from-warning/20 to-warning/30 text-warning",
    error: "bg-gradient-to-r from-error/20 to-error/30 text-error"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;