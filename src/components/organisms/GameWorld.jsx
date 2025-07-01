import React from 'react';
import { useBox, usePlane } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: { friction: 0.4, restitution: 0.1 }
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#2F4F4F" roughness={0.8} metalness={0.2} />
    </mesh>
  );
};

const Building = ({ position, size, color = "#1A1A1A" }) => {
  const [ref] = useBox(() => ({
    position,
    args: size,
    type: 'Static',
    material: { friction: 0.4, restitution: 0.1 }
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
    </mesh>
  );
};

const GameWorld = () => {
  // Create abandoned city environment
  const buildings = [
    { position: [10, 2.5, 10], size: [4, 5, 4] },
    { position: [-10, 3, 10], size: [3, 6, 3] },
    { position: [15, 1.5, -5], size: [5, 3, 5] },
    { position: [-8, 2, -12], size: [4, 4, 4] },
    { position: [0, 1, 20], size: [6, 2, 3] },
    { position: [-15, 2.5, 0], size: [3, 5, 6] },
    { position: [8, 1.5, -15], size: [4, 3, 4] },
    { position: [-5, 2, 15], size: [3, 4, 3] },
  ];

  // Debris and obstacles
  const debris = [
    { position: [5, 0.5, 5], size: [2, 1, 1], color: "#8B0000" },
    { position: [-3, 0.5, -3], size: [1.5, 1, 2], color: "#654321" },
    { position: [12, 0.5, -8], size: [1, 1, 1.5], color: "#2F4F4F" },
    { position: [-7, 0.5, 8], size: [2, 1, 1], color: "#8B0000" },
  ];

  return (
    <group>
      {/* Ground */}
      <Ground />

      {/* Buildings */}
      {buildings.map((building, index) => (
        <Building
          key={`building-${index}`}
          position={building.position}
          size={building.size}
          color={building.color}
        />
      ))}

      {/* Debris */}
      {debris.map((item, index) => (
        <Building
          key={`debris-${index}`}
          position={item.position}
          size={item.size}
          color={item.color}
        />
      ))}

      {/* Boundary walls */}
      <Building position={[0, 2.5, 50]} size={[100, 5, 1]} color="#1A1A1A" />
      <Building position={[0, 2.5, -50]} size={[100, 5, 1]} color="#1A1A1A" />
      <Building position={[50, 2.5, 0]} size={[1, 5, 100]} color="#1A1A1A" />
      <Building position={[-50, 2.5, 0]} size={[1, 5, 100]} color="#1A1A1A" />

      {/* Atmospheric fog */}
      <fog attach="fog" args={['#0D0D0D', 30, 80]} />
    </group>
  );
};

export default GameWorld;