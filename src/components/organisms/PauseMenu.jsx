import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const PauseMenu = ({ onResume, onMainMenu }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-surface/90 backdrop-blur-md rounded-2xl p-8 border border-accent/30 max-w-md w-full mx-4"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <ApperIcon name="Pause" size={48} className="text-warning mx-auto mb-4" />
          <h2 className="font-bebas text-4xl text-transparent bg-gradient-to-r from-warning to-accent bg-clip-text mb-2">
            GAME PAUSED
          </h2>
          <p className="font-inter text-gray-400">
            Mission temporarily suspended
          </p>
        </div>

        {/* Menu Options */}
        <div className="space-y-4">
          <Button
            onClick={onResume}
            variant="primary"
            size="large"
            icon="Play"
            className="w-full"
          >
            RESUME MISSION
          </Button>
          
          <Button
            variant="secondary"
            size="large"
            icon="Settings"
            className="w-full"
          >
            SETTINGS
          </Button>
          
          <Button
            onClick={onMainMenu}
            variant="danger"
            size="large"
            icon="Home"
            className="w-full"
          >
            ABORT MISSION
          </Button>
        </div>

        {/* Controls Reminder */}
        <div className="mt-8 p-4 bg-background/50 rounded-lg border border-gray-700">
          <h3 className="font-bebas text-lg text-accent mb-3">CONTROLS</h3>
          <div className="grid grid-cols-2 gap-2 text-sm font-inter text-gray-400">
            <div>WASD: Move</div>
            <div>Mouse: Look</div>
            <div>Click: Shoot</div>
            <div>R: Reload</div>
            <div>ESC: Pause</div>
            <div>Hold Shift: Run</div>
          </div>
        </div>

        {/* Mission Status */}
        <div className="mt-6 text-center">
          <p className="font-inter text-xs text-gray-500">
            Press ESC to resume or click Resume Mission
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PauseMenu;