export const gameService = {
  // Save game state to localStorage
  saveGameState: (gameState) => {
    try {
      localStorage.setItem('deadZoneGameState', JSON.stringify(gameState));
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Load game state from localStorage
  loadGameState: () => {
    try {
      const savedState = localStorage.getItem('deadZoneGameState');
      return Promise.resolve(savedState ? JSON.parse(savedState) : null);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Save high score
  saveHighScore: (score, wave, timeElapsed) => {
    try {
      const highScores = JSON.parse(localStorage.getItem('deadZoneHighScores') || '[]');
      const newScore = {
        score,
        wave,
        timeElapsed,
        date: new Date().toISOString(),
        id: Date.now()
      };
      
      highScores.push(newScore);
      highScores.sort((a, b) => b.score - a.score);
      
      // Keep only top 10 scores
      const topScores = highScores.slice(0, 10);
      localStorage.setItem('deadZoneHighScores', JSON.stringify(topScores));
      
      return Promise.resolve(topScores);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Get high scores
  getHighScores: () => {
    try {
      const highScores = JSON.parse(localStorage.getItem('deadZoneHighScores') || '[]');
      return Promise.resolve(highScores);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Save game settings
  saveSettings: (settings) => {
    try {
      localStorage.setItem('deadZoneSettings', JSON.stringify(settings));
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Load game settings
  loadSettings: () => {
    try {
      const settings = localStorage.getItem('deadZoneSettings');
      const defaultSettings = {
        graphics: 'high',
        mouseSensitivity: 0.002,
        volume: {
          master: 0.8,
          effects: 0.9,
          music: 0.6
        },
        controls: {
          forward: 'KeyW',
          backward: 'KeyS',
          left: 'KeyA',
          right: 'KeyD',
          reload: 'KeyR',
          pause: 'Escape'
        }
      };
      
      return Promise.resolve(settings ? { ...defaultSettings, ...JSON.parse(settings) } : defaultSettings);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Clear all game data
  clearGameData: () => {
    try {
      localStorage.removeItem('deadZoneGameState');
      localStorage.removeItem('deadZoneHighScores');
      localStorage.removeItem('deadZoneSettings');
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};