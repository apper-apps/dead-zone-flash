import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const WeaponDisplay = ({ 
  weapon, 
  isReloading = false, 
  className = '' 
}) => {
  const getWeaponIcon = (type) => {
    switch (type) {
      case 'rifle': return 'Zap';
      case 'shotgun': return 'Target';
      case 'pistol': return 'Crosshair';
      default: return 'Zap';
    }
  };

  return (
    <div className={`bg-surface/80 backdrop-blur-sm rounded-lg p-4 border border-accent/20 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <ApperIcon 
          name={getWeaponIcon(weapon.type)} 
          size={24} 
          className="text-accent" 
        />
        <h3 className="font-bebas text-xl text-white uppercase tracking-wide">
          {weapon.type}
        </h3>
      </div>

      <div className="space-y-2">
        {/* Ammo Display */}
        <div className="flex items-center justify-between">
          <span className="font-inter text-sm text-gray-400">AMMO</span>
          <span className="font-bebas text-lg text-accent">
            {weapon.currentAmmo} / {weapon.clipSize}
          </span>
        </div>

        {/* Ammo Bar */}
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(weapon.currentAmmo / weapon.clipSize) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Reload Status */}
        {isReloading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mt-3 p-2 bg-warning/20 rounded border border-warning/30"
          >
            <ApperIcon name="RotateCw" size={16} className="text-warning animate-spin" />
            <span className="font-inter text-sm text-warning">RELOADING...</span>
          </motion.div>
        )}

        {/* Weapon Stats */}
        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-700">
          <div className="text-center">
            <div className="font-bebas text-lg text-white">{weapon.damage}</div>
            <div className="font-inter text-xs text-gray-400">DAMAGE</div>
          </div>
          <div className="text-center">
            <div className="font-bebas text-lg text-white">{weapon.fireRate}</div>
            <div className="font-inter text-xs text-gray-400">FIRE RATE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeaponDisplay;