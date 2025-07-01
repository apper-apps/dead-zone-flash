import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { Vector3 } from 'three';

const Zombie = ({ zombie, playerPosition, onUpdate, onRemove }) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: zombie.position,
    args: [0.8, 1.8, 0.8],
    material: { friction: 0.4, restitution: 0.1 }
  }));

  const velocity = useRef([0, 0, 0]);
  const position = useRef(zombie.position);

  useEffect(() => {
    const unsubscribeVelocity = api.velocity.subscribe((v) => velocity.current = v);
    const unsubscribePosition = api.position.subscribe((p) => position.current = p);

    return () => {
      unsubscribeVelocity();
      unsubscribePosition();
    };
  }, [api]);

  useFrame((state, delta) => {
    if (zombie.health <= 0) {
      onRemove(zombie.id);
      return;
    }

    // AI movement towards player
    const zombiePos = new Vector3(...position.current);
    const playerPos = new Vector3(...playerPosition);
    const direction = playerPos.sub(zombiePos).normalize();
    
    // Apply movement
    const speed = zombie.speed;
    api.velocity.set(
      direction.x * speed,
      velocity.current[1],
      direction.z * speed
    );

    // Update zombie position
    onUpdate(zombie.id, {
      position: position.current,
      state: 'moving'
    });
  });

  const getZombieColor = () => {
    switch (zombie.type) {
      case 'fast': return '#FF6B35';
      case 'tank': return '#8B0000';
      default: return '#2F4F4F';
    }
  };

  const getZombieSize = () => {
    switch (zombie.type) {
      case 'fast': return [0.6, 1.6, 0.6];
      case 'tank': return [1.2, 2.2, 1.2];
      default: return [0.8, 1.8, 0.8];
    }
  };

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={getZombieSize()} />
      <meshStandardMaterial 
        color={getZombieColor()} 
        roughness={0.8} 
        metalness={0.2} 
      />
    </mesh>
  );
};

export default Zombie;