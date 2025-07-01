import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const MainMenu = ({ onStartGame }) => {
  return (
<div className="fixed inset-0 bg-gradient-to-br from-background via-surface to-background flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FF6B35\" fill-opacity=\"0.02\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="relative text-center max-w-4xl mx-auto px-8">
        {/* Main Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h1 className="font-bebas text-9xl md:text-[12rem] text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text mb-4 leading-none">
            DEAD ZONE
          </h1>
          <p className="font-inter text-2xl md:text-3xl text-gray-300 tracking-wider mb-2">
            ZOMBIE SURVIVAL FPS
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <span className="font-inter text-sm">FIRST PERSON SHOOTER</span>
            <span>•</span>
            <span className="font-inter text-sm">SURVIVAL HORROR</span>
            <span>•</span>
            <span className="font-inter text-sm">WAVE DEFENSE</span>
          </div>
        </motion.div>

        {/* Game Description */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <p className="font-inter text-lg text-gray-400 leading-relaxed mb-6">
            The city has fallen. Zombies roam the abandoned streets in endless waves. 
            Armed with military-grade weapons, you must survive the onslaught and 
            fight your way through the dead zone.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface/50 rounded-lg p-6 border border-accent/20">
              <ApperIcon name="Target" size={32} className="text-accent mx-auto mb-3" />
              <h3 className="font-bebas text-xl text-white mb-2">PRECISION COMBAT</h3>
              <p className="font-inter text-sm text-gray-400">
                Realistic weapon mechanics with recoil, reload animations, and precise aiming
              </p>
            </div>
            
            <div className="bg-surface/50 rounded-lg p-6 border border-success/20">
              <ApperIcon name="Zap" size={32} className="text-success mx-auto mb-3" />
              <h3 className="font-bebas text-xl text-white mb-2">WAVE SURVIVAL</h3>
              <p className="font-inter text-sm text-gray-400">
                Face increasingly difficult waves of zombies with unique abilities
              </p>
            </div>
            
            <div className="bg-surface/50 rounded-lg p-6 border border-warning/20">
              <ApperIcon name="Eye" size={32} className="text-warning mx-auto mb-3" />
              <h3 className="font-bebas text-xl text-white mb-2">IMMERSIVE ATMOSPHERE</h3>
              <p className="font-inter text-sm text-gray-400">
                Realistic lighting, sound effects, and environmental storytelling
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Action Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-8"
        >
          <Button
            onClick={onStartGame}
            variant="primary"
            size="large"
            icon="Play"
            className="text-3xl px-12 py-6 shadow-2xl shadow-accent/30"
          >
            START MISSION
          </Button>
        </motion.div>

        {/* Additional Menu Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="ghost"
            icon="Settings"
            className="min-w-[200px]"
          >
            SETTINGS
          </Button>
          <Button
            variant="ghost"
            icon="Trophy"
            className="min-w-[200px]"
          >
            LEADERBOARD
          </Button>
        </motion.div>

        {/* Warning Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mt-12 p-4 bg-warning/10 border border-warning/30 rounded-lg max-w-md mx-auto"
        >
          <div className="flex items-center gap-2 mb-2">
            <ApperIcon name="AlertTriangle" size={20} className="text-warning" />
            <span className="font-bebas text-warning">CONTENT WARNING</span>
          </div>
          <p className="font-inter text-sm text-gray-400">
            This game contains intense violence, gore, and mature themes. 
            Player discretion is advised.
          </p>
        </motion.div>

        {/* Controls Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="font-inter text-xs text-gray-600 mb-2">CONTROLS</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span>WASD: Move</span>
            <span>•</span>
            <span>Mouse: Look</span>
            <span>•</span>
            <span>Click: Shoot</span>
            <span>•</span>
            <span>R: Reload</span>
            <span>•</span>
            <span>ESC: Pause</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainMenu;