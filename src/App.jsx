import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import GameCanvas from '@/components/organisms/GameCanvas';
import MainMenu from '@/components/organisms/MainMenu';
import GameHUD from '@/components/organisms/GameHUD';
import GameOverScreen from '@/components/organisms/GameOverScreen';
import PauseMenu from '@/components/organisms/PauseMenu';
import LoadingScreen from '@/components/ui/Loading';
import { useGameState } from '@/hooks/useGameState';
import { useInputHandler } from '@/hooks/useInputHandler';

function App() {
  const [gameLoaded, setGameLoaded] = useState(false);
  const {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    resetGame,
    updatePlayer,
    updateGameStats,
    spawnZombie,
    removeZombie,
    updateZombie,
    zombies
  } = useGameState();

  const { bindInputs, unbindInputs } = useInputHandler({
    onPause: pauseGame,
    onResume: resumeGame,
    gameState,
    updatePlayer
  });

  useEffect(() => {
    // Simulate loading time for assets
    const loadTimer = setTimeout(() => {
      setGameLoaded(true);
    }, 2000);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (gameState.status === 'playing') {
      bindInputs();
    } else {
      unbindInputs();
    }

    return () => unbindInputs();
  }, [gameState.status, bindInputs, unbindInputs]);

  const handleStartGame = () => {
    startGame();
  };

  const handleRestartGame = () => {
    resetGame();
    startGame();
  };

  const handleMainMenu = () => {
    resetGame();
  };

  if (!gameLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-screen bg-background overflow-hidden game-ui">
      {/* Main Menu */}
      {gameState.status === 'menu' && (
        <MainMenu onStartGame={handleStartGame} />
      )}

      {/* Game Canvas */}
      {(gameState.status === 'playing' || gameState.status === 'paused') && (
        <GameCanvas
          gameState={gameState}
          zombies={zombies}
          onSpawnZombie={spawnZombie}
          onRemoveZombie={removeZombie}
          onUpdateZombie={updateZombie}
          onUpdatePlayer={updatePlayer}
          onUpdateGameStats={updateGameStats}
          onGameOver={endGame}
        />
      )}

      {/* Game HUD */}
      {gameState.status === 'playing' && (
        <GameHUD
          player={gameState.player}
          wave={gameState.wave}
          score={gameState.score}
          zombiesRemaining={gameState.zombiesRemaining}
          timeElapsed={gameState.timeElapsed}
        />
      )}

      {/* Pause Menu */}
      {gameState.status === 'paused' && (
        <PauseMenu
          onResume={resumeGame}
          onMainMenu={handleMainMenu}
        />
      )}

      {/* Game Over Screen */}
      {gameState.status === 'gameOver' && (
        <GameOverScreen
          finalScore={gameState.score}
          finalWave={gameState.wave}
          timeElapsed={gameState.timeElapsed}
          onRestart={handleRestartGame}
          onMainMenu={handleMainMenu}
        />
      )}

      {/* Crosshair */}
      {(gameState.status === 'playing') && (
        <div className="crosshair" />
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;