import { useState, useCallback } from 'react';

const initialWeapon = {
  type: 'rifle',
  damage: 25,
  fireRate: 600, // rounds per minute
  clipSize: 30,
  currentAmmo: 30,
  reloadTime: 2000 // milliseconds
};

const initialPlayer = {
  health: 100,
  armor: 0,
  position: [0, 1.6, 0],
  rotation: [0, 0, 0],
  currentWeapon: initialWeapon,
  ammo: {
    rifle: 300,
    pistol: 120,
    shotgun: 60
  }
};

const initialGameState = {
  status: 'menu', // menu, playing, paused, gameOver
  wave: 1,
  score: 0,
  zombiesRemaining: 5,
  timeElapsed: 0,
  player: initialPlayer
};

export const useGameState = () => {
  const [gameState, setGameState] = useState(initialGameState);
  const [zombies, setZombies] = useState([]);

  const startGame = useCallback(() => {
    setGameState({
      ...initialGameState,
      status: 'playing',
      player: { ...initialPlayer }
    });
    setZombies([]);
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'paused' }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'playing' }));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'gameOver' }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    setZombies([]);
  }, []);

  const updatePlayer = useCallback((playerData) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, ...playerData }
    }));
  }, []);

  const updateGameStats = useCallback((stats) => {
    setGameState(prev => ({ ...prev, ...stats }));
  }, []);

  const spawnZombie = useCallback((zombie) => {
    setZombies(prev => [...prev, zombie]);
  }, []);

  const removeZombie = useCallback((zombieId) => {
    setZombies(prev => {
      const zombie = prev.find(z => z.id === zombieId);
      if (zombie) {
        // Add score for killing zombie
        const scoreIncrease = zombie.type === 'fast' ? 150 : zombie.type === 'tank' ? 200 : 100;
        setGameState(prevState => ({
          ...prevState,
          score: prevState.score + scoreIncrease,
          zombiesRemaining: Math.max(0, prevState.zombiesRemaining - 1)
        }));
      }
      return prev.filter(z => z.id !== zombieId);
    });
  }, []);

  const updateZombie = useCallback((zombieId, updateData) => {
    setZombies(prev => prev.map(zombie => 
      zombie.id === zombieId 
        ? { ...zombie, ...updateData }
        : zombie
    ));
  }, []);

  return {
    gameState,
    zombies,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    resetGame,
    updatePlayer,
    updateGameStats,
    spawnZombie,
    removeZombie,
    updateZombie
  };
};