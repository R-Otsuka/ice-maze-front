import { useRef } from 'react';

export const useCanvas = () => {

	const canvasRef = useRef(null);

	const getContext = () => {
    const canvas = canvasRef.current;
    return canvas.getContext('2d');
  };
  return { canvasRef, getContext };
}
