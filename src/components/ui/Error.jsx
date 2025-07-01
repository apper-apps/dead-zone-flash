import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message, onRetry }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-surface to-background flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto p-8"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-error to-primary rounded-full mb-6"
        >
          <ApperIcon name="AlertTriangle" size={40} className="text-white" />
        </motion.div>

        {/* Error Message */}
        <h2 className="font-bebas text-4xl text-error mb-4">
          SYSTEM FAILURE
        </h2>
        
        <p className="font-inter text-lg text-gray-300 mb-2">
          Critical Error Detected
        </p>
        
        <p className="font-inter text-sm text-gray-400 mb-8 leading-relaxed">
          {message || "Unable to initialize game systems. Please check your browser compatibility and try again."}
        </p>

        {/* Retry Button */}
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="px-8 py-3 bg-gradient-to-r from-accent to-primary text-white font-bebas text-xl tracking-wide rounded-lg hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
          >
            <ApperIcon name="RotateCcw" size={20} className="inline mr-2" />
            RETRY MISSION
          </motion.button>
        )}

        {/* Technical Details */}
        <div className="mt-8 p-4 bg-surface/50 rounded-lg border border-primary/20">
          <p className="font-inter text-xs text-gray-500 mb-2">
            TECHNICAL DIAGNOSTICS
          </p>
          <div className="space-y-1 text-xs text-gray-400">
            <p>• WebGL Support: {window.WebGLRenderingContext ? "✓" : "✗"}</p>
            <p>• Hardware Acceleration: {navigator.hardwareConcurrency ? "✓" : "✗"}</p>
            <p>• Browser: {navigator.userAgent.split(' ')[0]}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;