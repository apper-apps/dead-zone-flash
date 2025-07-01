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
{/* Enhanced Lighting */}
        <ambientLight intensity={0.15} color="#2A2A40" />
        <directionalLight
          position={[20, 20, 10]}
          intensity={0.6}
          color="#FFA500"
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={100}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          shadow-bias={-0.0001}
        />
        
        {/* Atmospheric lighting */}
        <pointLight position={[0, 8, 0]} intensity={0.4} color="#FF6B35" distance={30} />
        <pointLight position={[15, 3, 15]} intensity={0.2} color="#4169E1" distance={20} />
        <pointLight position={[-15, 3, -15]} intensity={0.2} color="#4169E1" distance={20} />
        
        {/* Rim lighting */}
        <spotLight
          position={[0, 15, 0]}
          angle={Math.PI / 3}
          penumbra={0.5}
          intensity={0.3}
          color="#8A2BE2"
          distance={40}
          castShadow
        />

        {/* Enhanced Sky */}
        <Sky
          distance={450000}
          sunPosition={[0, 0.4, 0]}
          inclination={0.6}
          azimuth={0.25}
          turbidity={15}
          rayleigh={1.5}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
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