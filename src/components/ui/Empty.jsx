import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ title, message, actionText, onAction }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-surface to-background flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto p-8"
      >
        {/* Empty State Icon */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-secondary to-surface rounded-full mb-8 shadow-xl"
        >
          <ApperIcon name="Ghost" size={60} className="text-gray-400" />
        </motion.div>

        {/* Empty State Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="font-bebas text-5xl text-transparent bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text mb-4">
            {title || "NO SURVIVORS FOUND"}
          </h2>
          
          <p className="font-inter text-lg text-gray-400 mb-8 leading-relaxed">
            {message || "The area is clear of any activity. Time to move to a new location and continue the mission."}
          </p>

          {/* Action Button */}
          {onAction && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAction}
              className="px-10 py-4 bg-gradient-to-r from-accent to-primary text-white font-bebas text-2xl tracking-wide rounded-lg hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              <ApperIcon name="Play" size={24} className="inline mr-3" />
              {actionText || "START NEW MISSION"}
            </motion.button>
          )}
        </motion.div>

        {/* Atmospheric Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-6 text-center"
        >
          <div className="p-3 bg-surface/30 rounded-lg border border-gray-700">
            <ApperIcon name="Target" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-inter">TARGETS ELIMINATED</p>
          </div>
          <div className="p-3 bg-surface/30 rounded-lg border border-gray-700">
            <ApperIcon name="Shield" size={24} className="text-success mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-inter">MISSION SECURE</p>
          </div>
          <div className="p-3 bg-surface/30 rounded-lg border border-gray-700">
            <ApperIcon name="Clock" size={24} className="text-warning mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-inter">READY FOR DEPLOY</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Empty;