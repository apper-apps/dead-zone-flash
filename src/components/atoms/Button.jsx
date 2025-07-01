import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "font-bebas tracking-wide rounded-lg transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent to-primary text-white hover:shadow-lg hover:shadow-accent/25 border-2 border-transparent hover:border-accent/30",
    secondary: "bg-gradient-to-r from-secondary to-surface text-white hover:shadow-lg hover:shadow-secondary/25 border-2 border-secondary hover:border-secondary/50",
    danger: "bg-gradient-to-r from-error to-primary text-white hover:shadow-lg hover:shadow-error/25 border-2 border-transparent hover:border-error/30",
    ghost: "bg-transparent text-gray-300 hover:text-white border-2 border-gray-600 hover:border-accent hover:bg-accent/10",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-lg",
    large: "px-8 py-4 text-xl",
  };

  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "cursor-pointer hover:scale-105";

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <ApperIcon name={icon} size={20} />}
      {children}
    </motion.button>
  );
};

export default Button;