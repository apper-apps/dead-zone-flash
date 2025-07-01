import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import GameWorld from '@/components/organisms/GameWorld';
import Player from '@/components/organisms/Player';
import ZombieManager from '@/components/organisms/ZombieManager';

const GameCanvas = ({
  gameState,
  zombies,
  onSpawnZombie,
  onRemoveZombie,
  onUpdateZombie,
  onUpdatePlayer,
  onUpdateGameStats,
  onGameOver
}) => {
  const controlsRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        if (controlsRef.current) {
          controlsRef.current.unlock();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 bg-background">
      <Canvas
        camera={{ fov: 75, position: [0, 1.6, 0] }}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          alpha: false 
        }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} color="#404040" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          color="#FFA500"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#FF6B35" />

        {/* Sky */}
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0.49}
          azimuth={0.25}
          turbidity={10}
          rayleigh={2}
        />

        {/* Physics World */}
        <Physics gravity={[0, -9.82, 0]} iterations={15}>
          {/* Game World */}
          <GameWorld />

          {/* Player */}
          <Player
            gameState={gameState}
            onUpdatePlayer={onUpdatePlayer}
            onGameOver={onGameOver}
            zombies={zombies}
          />

          {/* Zombie Manager */}
          <ZombieManager
            gameState={gameState}
            zombies={zombies}
            onSpawnZombie={onSpawnZombie}
            onRemoveZombie={onRemoveZombie}
            onUpdateZombie={onUpdateZombie}
            onUpdateGameStats={onUpdateGameStats}
          />
        </Physics>

        {/* First Person Controls */}
        <PointerLockControls
          ref={controlsRef}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
};

export default GameCanvas;