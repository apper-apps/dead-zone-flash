import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import Zombie from '@/components/organisms/Zombie';

const ZombieManager = ({
  gameState,
  zombies,
  onSpawnZombie,
  onRemoveZombie,
  onUpdateZombie,
  onUpdateGameStats
}) => {
  const spawnTimer = useRef(0);
  const waveTimer = useRef(0);
  const maxZombiesPerWave = useRef(5 + gameState.wave * 3);

  useFrame((state, delta) => {
    if (gameState.status !== 'playing') return;

    spawnTimer.current += delta;
    waveTimer.current += delta;

    // Spawn zombies
    if (spawnTimer.current > 2 && zombies.length < maxZombiesPerWave.current) {
      spawnZombie();
      spawnTimer.current = 0;
    }

    // Check wave completion
    if (zombies.length === 0 && waveTimer.current > 5) {
      nextWave();
    }
  });

  const spawnZombie = () => {
    const spawnPositions = [
      [20, 1, 20], [-20, 1, 20], [20, 1, -20], [-20, 1, -20],
      [30, 1, 0], [-30, 1, 0], [0, 1, 30], [0, 1, -30]
    ];

    const position = spawnPositions[Math.floor(Math.random() * spawnPositions.length)];
    const types = ['normal', 'fast', 'tank'];
    const weights = [0.6, 0.3, 0.1];
    
    let type = 'normal';
    const rand = Math.random();
    let weightSum = 0;
    
    for (let i = 0; i < types.length; i++) {
      weightSum += weights[i];
      if (rand <= weightSum) {
        type = types[i];
        break;
      }
    }

    const zombie = {
      id: `zombie_${Date.now()}_${Math.random()}`,
      type,
      position,
      health: type === 'tank' ? 150 : type === 'fast' ? 75 : 100,
      speed: type === 'fast' ? 4 : type === 'tank' ? 1.5 : 2.5,
      damage: type === 'tank' ? 30 : type === 'fast' ? 15 : 20,
      state: 'spawning'
    };

    onSpawnZombie(zombie);
  };

  const nextWave = () => {
    const newWave = gameState.wave + 1;
    maxZombiesPerWave.current = 5 + newWave * 3;
    waveTimer.current = 0;
    
    onUpdateGameStats({
      wave: newWave,
      zombiesRemaining: maxZombiesPerWave.current
    });
  };

  return (
    <group>
      {zombies.map(zombie => (
        <Zombie
          key={zombie.id}
          zombie={zombie}
          playerPosition={[0, 1.6, 0]} // This should come from actual player position
          onUpdate={onUpdateZombie}
          onRemove={onRemoveZombie}
        />
      ))}
    </group>
  );
};

export default ZombieManager;