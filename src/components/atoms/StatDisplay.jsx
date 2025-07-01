import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatDisplay = ({ 
  icon, 
  label, 
  value, 
  maxValue, 
  variant = 'default',
  showBar = false,
  className = ''
}) => {
  const variants = {
    default: "text-gray-300",
    health: "text-success",
    ammo: "text-accent",
    danger: "text-error",
    warning: "text-warning",
  };

  const getBarColor = () => {
    if (!showBar || !maxValue) return "bg-accent";
    
    const percentage = (value / maxValue) * 100;
    if (percentage <= 25) return "bg-error";
    if (percentage <= 50) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon && (
        <div className="flex-shrink-0">
          <ApperIcon name={icon} size={20} className={variants[variant]} />
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-inter text-sm text-gray-400 uppercase tracking-wide">
            {label}
          </span>
          <span className={`font-bebas text-xl ${variants[variant]}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
            {maxValue && `/${maxValue}`}
          </span>
        </div>
        
        {showBar && maxValue && (
          <div className="mt-1 h-2 bg-surface rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getBarColor()} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(0, Math.min(100, (value / maxValue) * 100))}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatDisplay;