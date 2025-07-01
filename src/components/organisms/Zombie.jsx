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

  const ZombieHead = ({ type, color }) => (
    <mesh position={[0, 0.7, 0]} castShadow>
      <sphereGeometry args={type === 'tank' ? [0.25, 8, 8] : [0.2, 8, 8]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.9} 
        metalness={0.1}
        bumpScale={0.1}
      />
      {/* Eyes */}
      <mesh position={[0.08, 0.05, 0.15]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#FF0000" emissive="#440000" />
      </mesh>
      <mesh position={[-0.08, 0.05, 0.15]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#FF0000" emissive="#440000" />
      </mesh>
    </mesh>
  );

  const ZombieBody = ({ type, color, size }) => (
    <mesh position={[0, 0, 0]} castShadow>
      <boxGeometry args={[size[0] * 0.8, size[1] * 0.6, size[2] * 0.6]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.8} 
        metalness={0.1}
        bumpScale={0.05}
      />
    </mesh>
  );

  const ZombieArms = ({ type, color, size }) => (
    <group>
      <mesh position={[size[0] * 0.6, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.06, size[1] * 0.4, 6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[-size[0] * 0.6, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.06, size[1] * 0.4, 6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );

  const ZombieLegs = ({ type, color, size }) => (
    <group>
      <mesh position={[size[0] * 0.25, -size[1] * 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, size[1] * 0.5, 6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[-size[0] * 0.25, -size[1] * 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, size[1] * 0.5, 6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );

  const zombieSize = getZombieSize();
  const zombieColor = getZombieColor();

  return (
    <group ref={ref}>
      <ZombieBody type={zombie.type} color={zombieColor} size={zombieSize} />
      <ZombieHead type={zombie.type} color={zombieColor} />
      <ZombieArms type={zombie.type} color={zombieColor} size={zombieSize} />
      <ZombieLegs type={zombie.type} color={zombieColor} size={zombieSize} />
      
      {/* Damaged effect for low health */}
      {zombie.health < 30 && (
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial 
            color="#8B0000" 
            transparent 
            opacity={0.6}
            emissive="#220000"
          />
        </mesh>
      )}
    </group>
  );
};

export default Zombie;