import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const HealthBar = ({ 
  health, 
  maxHealth = 100, 
  armor = 0, 
  maxArmor = 100,
  showDamageEffect = false,
  className = '' 
}) => {
  const [prevHealth, setPrevHealth] = useState(health);
  const [showDamage, setShowDamage] = useState(false);

  useEffect(() => {
    if (health < prevHealth) {
      setShowDamage(true);
      const timer = setTimeout(() => setShowDamage(false), 500);
      return () => clearTimeout(timer);
    }
    setPrevHealth(health);
  }, [health, prevHealth]);

  const healthPercentage = Math.max(0, (health / maxHealth) * 100);
  const armorPercentage = Math.max(0, (armor / maxArmor) * 100);

  const getHealthColor = () => {
    if (healthPercentage <= 25) return "from-error to-error/70";
    if (healthPercentage <= 50) return "from-warning to-warning/70";
    return "from-success to-success/70";
  };

  return (
    <div className={`relative ${className}`}>
      {/* Damage Flash Effect */}
      {(showDamage || showDamageEffect) && (
        <div className="damage-overlay animate-damage-flash" />
      )}

      <div className="bg-surface/80 backdrop-blur-sm rounded-lg p-4 border border-success/20">
        {/* Health Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ApperIcon name="Heart" size={20} className="text-success" />
              <span className="font-inter text-sm text-gray-400 uppercase tracking-wide">
                Health
              </span>
            </div>
            <span className="font-bebas text-xl text-success">
              {Math.round(health)} / {maxHealth}
            </span>
          </div>

          <div className="h-3 bg-background rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getHealthColor()} rounded-full`}
              initial={{ width: `${healthPercentage}%` }}
              animate={{ width: `${healthPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Armor Section */}
        {armor > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" size={20} className="text-info" />
                <span className="font-inter text-sm text-gray-400 uppercase tracking-wide">
                  Armor
                </span>
              </div>
              <span className="font-bebas text-xl text-info">
                {Math.round(armor)} / {maxArmor}
              </span>
            </div>

            <div className="h-2 bg-background rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-info to-info/70 rounded-full"
                initial={{ width: `${armorPercentage}%` }}
                animate={{ width: `${armorPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Critical Health Warning */}
        {healthPercentage <= 25 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 flex items-center justify-center gap-2 p-2 bg-error/20 rounded border border-error/30"
          >
            <ApperIcon name="AlertTriangle" size={16} className="text-error" />
            <span className="font-inter text-sm text-error">CRITICAL CONDITION</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HealthBar;