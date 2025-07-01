import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { toast } from 'react-toastify';

const Player = ({ gameState, onUpdatePlayer, onGameOver, zombies }) => {
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1.6, 0],
    material: { friction: 0.1, restitution: 0.1 }
  }));

  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 1.6, 0]);
  const keys = useRef({});
  const [isReloading, setIsReloading] = useState(false);
  const [muzzleFlash, setMuzzleFlash] = useState(false);
  const lastShotTime = useRef(0);

  // Subscribe to physics updates
  useEffect(() => {
    const unsubscribeVelocity = api.velocity.subscribe((v) => velocity.current = v);
    const unsubscribePosition = api.position.subscribe((p) => {
      position.current = p;
      camera.position.set(p[0], p[1], p[2]);
    });

    return () => {
      unsubscribeVelocity();
      unsubscribePosition();
    };
  }, [api, camera]);

  // Input handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      keys.current[event.code] = true;
      
      if (event.code === 'KeyR' && !isReloading) {
        handleReload();
      }
    };

    const handleKeyUp = (event) => {
      keys.current[event.code] = false;
    };

    const handleMouseDown = (event) => {
      if (event.button === 0) { // Left click
        handleShoot();
      }
    };

    const handleMouseMove = (event) => {
      if (document.pointerLockElement) {
        camera.rotation.y -= event.movementX * 0.002;
        camera.rotation.x -= event.movementY * 0.002;
        camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera, isReloading]);

  const handleShoot = () => {
    const now = Date.now();
    const weapon = gameState.player.currentWeapon;
    
    if (now - lastShotTime.current < 60000 / weapon.fireRate) return;
    if (weapon.currentAmmo <= 0) {
      toast.error("Out of ammo! Press R to reload");
      return;
    }
    if (isReloading) return;

    lastShotTime.current = now;
    
    // Show muzzle flash
    setMuzzleFlash(true);
    setTimeout(() => setMuzzleFlash(false), 100);

    // Update weapon ammo
    const updatedWeapon = {
      ...weapon,
      currentAmmo: weapon.currentAmmo - 1
    };

    onUpdatePlayer({
      ...gameState.player,
      currentWeapon: updatedWeapon
    });

    // Check for zombie hits
    checkZombieHits();
  };

  const handleReload = () => {
    const weapon = gameState.player.currentWeapon;
    if (weapon.currentAmmo >= weapon.clipSize) return;
    
    setIsReloading(true);
    toast.info("Reloading...");

    setTimeout(() => {
      const updatedWeapon = {
        ...weapon,
        currentAmmo: weapon.clipSize
      };

      onUpdatePlayer({
        ...gameState.player,
        currentWeapon: updatedWeapon
      });

      setIsReloading(false);
      toast.success("Reload complete");
    }, weapon.reloadTime);
  };

  const checkZombieHits = () => {
    const playerPos = new Vector3(...position.current);
    const direction = new Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);

    zombies.forEach(zombie => {
      const zombiePos = new Vector3(...zombie.position);
      const distance = playerPos.distanceTo(zombiePos);
      
      if (distance < 20) { // Weapon range
        const directionToZombie = zombiePos.clone().sub(playerPos).normalize();
        const angle = direction.angleTo(directionToZombie);
        
        if (angle < 0.1) { // Hit detection cone
          // Damage zombie
          const damage = gameState.player.currentWeapon.damage;
          const newHealth = Math.max(0, zombie.health - damage);
          
          if (newHealth <= 0) {
            // Zombie killed
            toast.success(`+${zombie.type === 'fast' ? 150 : 100} points`);
          }
        }
      }
    });
  };

  const checkZombieCollisions = () => {
    const playerPos = new Vector3(...position.current);
    
    zombies.forEach(zombie => {
      const zombiePos = new Vector3(...zombie.position);
      const distance = playerPos.distanceTo(zombiePos);
      
      if (distance < 2) { // Collision distance
        // Take damage
        const newHealth = Math.max(0, gameState.player.health - zombie.damage);
        
        onUpdatePlayer({
          ...gameState.player,
          health: newHealth
        });

        if (newHealth <= 0) {
          onGameOver();
        }
      }
    });
  };

  useFrame((state, delta) => {
    if (gameState.status !== 'playing') return;

    // Movement
    const moveSpeed = 5;
    const direction = new Vector3();
    
    if (keys.current['KeyW']) direction.z -= 1;
    if (keys.current['KeyS']) direction.z += 1;
    if (keys.current['KeyA']) direction.x -= 1;
    if (keys.current['KeyD']) direction.x += 1;

    if (direction.length() > 0) {
      direction.normalize();
      direction.applyQuaternion(camera.quaternion);
      direction.y = 0; // Don't move vertically
      direction.normalize();
      
      api.velocity.set(
        direction.x * moveSpeed,
        velocity.current[1],
        direction.z * moveSpeed
      );
    } else {
      api.velocity.set(0, velocity.current[1], 0);
    }

    // Check collisions
    checkZombieCollisions();
  });

  // Render muzzle flash effect
  useEffect(() => {
    if (muzzleFlash) {
      const flashElement = document.createElement('div');
      flashElement.className = 'muzzle-flash animate-muzzle-flash';
      document.body.appendChild(flashElement);
      
      setTimeout(() => {
        if (document.body.contains(flashElement)) {
          document.body.removeChild(flashElement);
        }
      }, 100);
    }
  }, [muzzleFlash]);

  // Render reload indicator
  useEffect(() => {
    if (isReloading) {
      const reloadElement = document.createElement('div');
      reloadElement.className = 'reload-indicator animate-reload';
      reloadElement.textContent = 'RELOADING...';
      document.body.appendChild(reloadElement);
      
      const cleanup = () => {
        if (document.body.contains(reloadElement)) {
          document.body.removeChild(reloadElement);
        }
      };

      const timer = setTimeout(cleanup, gameState.player.currentWeapon.reloadTime);
      
      return () => {
        clearTimeout(timer);
        cleanup();
      };
    }
}, [isReloading, gameState.player.currentWeapon.reloadTime]);

  // Gun Model Component
  const GunModel = () => {
    const gunRef = useRef();
    const weapon = gameState.player.currentWeapon;
    
    useFrame((state) => {
      if (gunRef.current) {
        // Gun sway and movement
        const time = state.clock.getElapsedTime();
        gunRef.current.rotation.x = Math.sin(time * 2) * 0.002;
        gunRef.current.rotation.y = Math.cos(time * 1.5) * 0.001;
        gunRef.current.position.y = -0.8 + Math.sin(time * 3) * 0.005;
        
        // Recoil effect during shooting
        if (muzzleFlash) {
          gunRef.current.rotation.x += 0.05;
          gunRef.current.position.z += 0.02;
        }
      }
    });

    return (
      <group 
        ref={gunRef}
        position={[0.3, -0.8, -0.5]}
        rotation={[0, Math.PI + 0.2, 0]}
      >
        {/* Gun barrel */}
        <mesh position={[0, 0.1, 0.4]}>
          <cylinderGeometry args={[0.02, 0.025, 0.6, 8]} />
          <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Gun body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.15, 0.2, 0.4]} />
          <meshStandardMaterial color="#1A1A1A" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Gun handle */}
        <mesh position={[0, -0.15, -0.1]}>
          <boxGeometry args={[0.08, 0.3, 0.15]} />
          <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.8} />
        </mesh>
        
        {/* Gun sight */}
        <mesh position={[0, 0.15, 0.2]}>
          <boxGeometry args={[0.02, 0.05, 0.1]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Trigger guard */}
        <mesh position={[0, -0.05, -0.05]}>
          <torusGeometry args={[0.04, 0.008, 6, 12]} />
          <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Muzzle flash effect */}
        {muzzleFlash && (
          <mesh position={[0, 0.1, 0.7]}>
            <coneGeometry args={[0.08, 0.2, 8]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FF6B35"
              transparent 
              opacity={0.8}
            />
          </mesh>
        )}
      </group>
    );
  };

return (
    <>
      <mesh ref={ref} visible={false} />
      <GunModel />
    </>
  );
};

export default Player;