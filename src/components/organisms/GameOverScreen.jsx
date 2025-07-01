import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const GameOverScreen = ({ 
  finalScore, 
  finalWave, 
  timeElapsed,
  onRestart, 
  onMainMenu 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const getPerformanceRating = () => {
    if (finalScore >= 5000) return { rating: "LEGENDARY", color: "text-accent" };
    if (finalScore >= 3000) return { rating: "EXCELLENT", color: "text-success" };
    if (finalScore >= 1500) return { rating: "GOOD", color: "text-warning" };
    if (finalScore >= 500) return { rating: "AVERAGE", color: "text-info" };
    return { rating: "NEEDS IMPROVEMENT", color: "text-error" };
  };

  const performance = getPerformanceRating();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-background via-surface to-background flex items-center justify-center"
    >
      <div className="text-center max-w-2xl mx-auto px-8">
        {/* Game Over Title */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className="relative">
            <h1 className="font-bebas text-8xl text-transparent bg-gradient-to-r from-error via-primary to-error bg-clip-text mb-4">
              MISSION FAILED
            </h1>
            <div className="absolute inset-0 font-bebas text-8xl text-error/20 blur-sm -z-10">
              MISSION FAILED
            </div>
          </div>
          <p className="font-inter text-xl text-gray-400">
            You have fallen in the dead zone
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 mb-8"
        >
          <h2 className="font-bebas text-3xl text-white mb-6">MISSION STATISTICS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mx-auto mb-3">
                <ApperIcon name="Target" size={32} className="text-accent" />
              </div>
              <div className="font-bebas text-4xl text-accent mb-1">
                {finalScore.toLocaleString()}
              </div>
              <div className="font-inter text-sm text-gray-400">FINAL SCORE</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-warning/20 rounded-full mx-auto mb-3">
                <ApperIcon name="Zap" size={32} className="text-warning" />
              </div>
              <div className="font-bebas text-4xl text-warning mb-1">
                {finalWave}
              </div>
              <div className="font-inter text-sm text-gray-400">WAVES SURVIVED</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-info/20 rounded-full mx-auto mb-3">
                <ApperIcon name="Clock" size={32} className="text-info" />
              </div>
              <div className="font-bebas text-4xl text-info mb-1">
                {formatTime(timeElapsed)}
              </div>
              <div className="font-inter text-sm text-gray-400">TIME SURVIVED</div>
            </div>
          </div>

          {/* Performance Rating */}
          <div className="border-t border-gray-700 pt-6">
            <div className="text-center">
              <div className="font-inter text-sm text-gray-400 mb-2">PERFORMANCE RATING</div>
              <div className={`font-bebas text-2xl ${performance.color}`}>
                {performance.rating}
              </div>
              <div className="font-inter text-sm text-gray-500 mt-2">
                Kills: {Math.floor(finalScore / 100)} • Accuracy: {Math.floor(Math.random() * 40 + 60)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onRestart}
            variant="primary"
            size="large"
            icon="RotateCcw"
            className="min-w-[200px]"
          >
            TRY AGAIN
          </Button>
          
          <Button
            onClick={onMainMenu}
            variant="secondary"
            size="large"
            icon="Home"
            className="min-w-[200px]"
          >
            MAIN MENU
          </Button>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20"
        >
          <ApperIcon name="Skull" size={32} className="text-primary mx-auto mb-3" />
          <p className="font-inter text-gray-300 text-lg">
            "In the dead zone, every second counts. Learn from your mistakes and survive longer."
          </p>
          <p className="font-inter text-sm text-gray-500 mt-2">
            - Survivor's Manual
          </p>
        </motion.div>

        {/* High Score Notice */}
        {finalScore > 2000 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-6 p-4 bg-success/20 rounded-lg border border-success/30"
          >
            <div className="flex items-center justify-center gap-2">
              <ApperIcon name="Trophy" size={20} className="text-success" />
              <span className="font-bebas text-success">HIGH SCORE ACHIEVED!</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GameOverScreen;