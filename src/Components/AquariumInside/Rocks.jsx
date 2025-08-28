import { useEffect, useMemo } from 'react';
import { randomInRange, BoundingSize } from '../../Utils/Math';
import { useGLTF } from '@react-three/drei';
import Rock from './Rock';
import { usePlayerStore } from '../../Store/useGame';

const Rocks = ({ count = 10, xRange, yRange, zRange, scaleRange }) => {
  const { scene } = useGLTF('./models/rock.glb');
  const baseRadius = useMemo(() => BoundingSize(scene).x / 2 || 0.5, [scene]);

  const resetCounter = usePlayerStore((state) => state.resetCounter);
  const setChosenRockId = usePlayerStore((state) => state.setChosenRockId);

  // Pick treasure rock only when reset
  useEffect(() => {
    const randomId = Math.floor(Math.random() * count);
    setChosenRockId(randomId);
  }, [resetCounter, count, setChosenRockId]);

  // Generate rocks only when reset
  const rocks = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const scale = randomInRange(scaleRange[0], scaleRange[1]);
      return {
        id: i,
        scale,
        rotationY: randomInRange(0, Math.PI * 2),
        position: [
          randomInRange(xRange[0], xRange[1]),
          randomInRange(yRange[0], yRange[1]),
          randomInRange(zRange[0], zRange[1]),
        ],
        radius: baseRadius * scale,
      };
    });
  }, [
    resetCounter, // only when reset
    count,
    baseRadius,
    xRange[0], xRange[1],
    yRange[0], yRange[1],
    zRange[0], zRange[1],
    scaleRange[0], scaleRange[1],
  ]);

  return rocks.map((rock) => (
    <Rock key={rock.id} {...rock} />
  ));
};

export default Rocks;

