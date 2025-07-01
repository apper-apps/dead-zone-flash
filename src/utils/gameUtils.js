import { Vector3 } from 'three';

export const gameUtils = {
  // Calculate distance between two 3D points
  calculateDistance: (pos1, pos2) => {
    const vec1 = new Vector3(...pos1);
    const vec2 = new Vector3(...pos2);
    return vec1.distanceTo(vec2);
  },

  // Generate random spawn position around the map perimeter
  getRandomSpawnPosition: (centerX = 0, centerZ = 0, minDistance = 25, maxDistance = 35) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    
    return [
      centerX + Math.cos(angle) * distance,
      1, // Y position (ground level)
      centerZ + Math.sin(angle) * distance
    ];
  },

  // Calculate damage with distance falloff
  calculateDamage: (baseDamage, distance, maxRange = 50) => {
    if (distance > maxRange) return 0;
    const falloff = Math.max(0, 1 - (distance / maxRange));
    return Math.floor(baseDamage * falloff);
  },

  // Check if point is within field of view
  isInFieldOfView: (playerPos, playerDirection, targetPos, fovAngle = Math.PI / 4) => {
    const playerVec = new Vector3(...playerPos);
    const targetVec = new Vector3(...targetPos);
    const directionVec = new Vector3(...playerDirection);
    
    const toTarget = targetVec.sub(playerVec).normalize();
    const angle = directionVec.angleTo(toTarget);
    
    return angle <= fovAngle;
  },

  // Format score with commas
  formatScore: (score) => {
    return score.toLocaleString();
  },

  // Format time as MM:SS
  formatTime: (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  // Calculate wave difficulty multiplier
  getWaveDifficultyMultiplier: (wave) => {
    return 1 + (wave - 1) * 0.2; // 20% increase per wave
  },

  // Get zombie spawn count for wave
  getZombieSpawnCount: (wave) => {
    return Math.min(5 + wave * 3, 25); // Cap at 25 zombies
  },

  // Calculate weapon spread based on movement
  calculateWeaponSpread: (isMoving, baseSpread = 0.02) => {
    return isMoving ? baseSpread * 2 : baseSpread;
  },

  // Generate muzzle flash position offset
  getMuzzleFlashOffset: () => {
    return {
      x: (Math.random() - 0.5) * 0.1,
      y: (Math.random() - 0.5) * 0.1,
      z: 0
    };
  },

  // Check if zombie is in attack range
  isInAttackRange: (zombiePos, playerPos, attackRange = 2) => {
    return gameUtils.calculateDistance(zombiePos, playerPos) <= attackRange;
  },

  // Calculate zombie AI direction to player
  getDirectionToPlayer: (zombiePos, playerPos) => {
    const zombieVec = new Vector3(...zombiePos);
    const playerVec = new Vector3(...playerPos);
    return playerVec.sub(zombieVec).normalize();
  },

  // Generate blood splatter effect data
  generateBloodSplatter: (hitPosition, hitDirection) => {
    const particles = [];
    const particleCount = Math.floor(Math.random() * 8) + 4;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        position: [...hitPosition],
        velocity: [
          hitDirection[0] + (Math.random() - 0.5) * 2,
          Math.random() * 2 + 1,
          hitDirection[2] + (Math.random() - 0.5) * 2
        ],
        size: Math.random() * 0.1 + 0.05,
        life: Math.random() * 2 + 1
      });
    }
    
    return particles;
  },

  // Check line of sight between two points (simplified)
  hasLineOfSight: (pos1, pos2, obstacles = []) => {
    // Simplified line of sight check
    // In a real implementation, this would use raycasting
    const distance = gameUtils.calculateDistance(pos1, pos2);
    return distance < 50; // Basic visibility range
  },

  // Generate random weapon recoil pattern
  generateRecoilPattern: (weapon) => {
    const baseRecoil = weapon.damage * 0.001;
    return {
      x: (Math.random() - 0.5) * baseRecoil,
      y: Math.random() * baseRecoil * 0.5,
      recovery: 0.95
    };
  }
};