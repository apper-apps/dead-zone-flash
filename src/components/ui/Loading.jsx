import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-surface to-background flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-bebas text-8xl text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text mb-4">
            DEAD ZONE
          </h1>
          <p className="font-inter text-xl text-gray-400 tracking-wide">
            ZOMBIE SURVIVAL FPS
          </p>
        </motion.div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-inter text-lg text-gray-300 tracking-wider"
        >
          Loading weapons and ammunition...
        </motion.p>

        {/* Progress Bar */}
        <div className="mt-6 w-80 mx-auto">
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Warning Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 text-center text-warning text-sm font-inter"
        >
          <p>⚠️ This game contains intense violence and gore</p>
          <p className="mt-1 text-gray-500">Recommended for mature audiences</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;