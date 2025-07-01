import React from 'react';
import { motion } from 'framer-motion';
import StatDisplay from '@/components/atoms/StatDisplay';
import WeaponDisplay from '@/components/molecules/WeaponDisplay';
import HealthBar from '@/components/molecules/HealthBar';

const GameHUD = ({ 
  player, 
  wave, 
  score, 
  zombiesRemaining, 
  timeElapsed 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        {/* Left Side - Game Stats */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-surface/80 backdrop-blur-sm rounded-lg p-4 border border-accent/20 min-w-[200px]"
        >
          <div className="space-y-3">
            <StatDisplay
              icon="Zap"
              label="Wave"
              value={wave}
              variant="warning"
            />
            <StatDisplay
              icon="Target"
              label="Score"
              value={score}
              variant="accent"
            />
            <StatDisplay
              icon="Users"
              label="Zombies Left"
              value={zombiesRemaining}
              variant="danger"
            />
            <StatDisplay
              icon="Clock"
              label="Time"
              value={formatTime(timeElapsed)}
              variant="default"
            />
          </div>
        </motion.div>

        {/* Right Side - Weapon Info */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pointer-events-auto"
        >
          <WeaponDisplay
            weapon={player.currentWeapon}
            isReloading={false}
            className="min-w-[220px]"
          />
        </motion.div>
      </div>

      {/* Bottom Left - Health */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-4 left-4 pointer-events-auto"
      >
        <HealthBar
          health={player.health}
          maxHealth={100}
          armor={player.armor}
          maxArmor={100}
          className="min-w-[280px]"
        />
      </motion.div>

      {/* Bottom Right - Additional Info */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-4 right-4 pointer-events-auto"
      >
        <div className="bg-surface/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
          <div className="text-center">
            <div className="font-bebas text-2xl text-primary mb-1">
              KILLS
            </div>
            <div className="font-bebas text-4xl text-white">
              {Math.floor(score / 100)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center - Wave Announcement */}
      {wave > 1 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="text-center">
            <div className="font-bebas text-6xl text-transparent bg-gradient-to-r from-accent to-primary bg-clip-text mb-2">
              WAVE {wave}
            </div>
            <div className="font-inter text-xl text-gray-300">
              {zombiesRemaining} zombies incoming
            </div>
          </div>
        </motion.div>
      )}

      {/* Damage Indicators */}
      {player.health < 30 && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-error/20 pointer-events-none animate-pulse" />
      )}
    </div>
  );
};

export default GameHUD;