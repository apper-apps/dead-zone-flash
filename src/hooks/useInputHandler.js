import { useCallback, useRef } from 'react';

export const useInputHandler = ({ onPause, onResume, gameState, updatePlayer }) => {
  const keysRef = useRef({});
  const boundRef = useRef(false);

  const handleKeyDown = useCallback((event) => {
    keysRef.current[event.code] = true;

    // Prevent default browser behavior for game keys
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyR', 'Space'].includes(event.code)) {
      event.preventDefault();
    }

    // Handle pause/resume
    if (event.code === 'Escape') {
      event.preventDefault();
      if (gameState.status === 'playing') {
        onPause();
      } else if (gameState.status === 'paused') {
        onResume();
      }
    }
  }, [gameState.status, onPause, onResume]);

  const handleKeyUp = useCallback((event) => {
    keysRef.current[event.code] = false;
  }, []);

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
  }, []);

  const bindInputs = useCallback(() => {
    if (boundRef.current) return;

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('contextmenu', handleContextMenu);
    
    boundRef.current = true;
  }, [handleKeyDown, handleKeyUp, handleContextMenu]);

  const unbindInputs = useCallback(() => {
    if (!boundRef.current) return;

    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('contextmenu', handleContextMenu);
    
    boundRef.current = false;
  }, [handleKeyDown, handleKeyUp, handleContextMenu]);

  return {
    bindInputs,
    unbindInputs,
    keys: keysRef.current
  };
};