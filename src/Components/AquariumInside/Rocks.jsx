import { useEffect, useMemo } from 'react';
import { randomInRange, BoundingSize } from '../../Utils/Math';
import { useGLTF } from '@react-three/drei';
import { usePlayerStore } from '../../Store/useGame';
import Rock from './Rock';

const Rocks = ({ xRange, yRange, zRange, scaleRange }) => {
  const {scene}  = useGLTF('./models/rock.glb');
  const {resetCounter,setChosenRockId,RockCount} = usePlayerStore((state) => state);

  // Set treasure ID
  useEffect(() => {
    const randomId = Math.floor(Math.random() * RockCount);
    setChosenRockId(randomId);
  }, [resetCounter]); 

  // Generate rocks values
  const baseRadius = useMemo(() => BoundingSize(scene).x / 2 || 0.5, [scene]);
  const rocks = useMemo(() => {
    return Array.from({ length: RockCount }).map((_, i) => {
      const scale = randomInRange(scaleRange[0], scaleRange[1]);
      return {
        id: i,
        scale,
        rotationY: randomInRange(0, Math.PI * 2),
        position: [ randomInRange(xRange[0], xRange[1]), randomInRange(yRange[0], yRange[1]),randomInRange(zRange[0], zRange[1])],
        radius: baseRadius * scale,
        scene
      };
    });
  }, [resetCounter]);

  return rocks.map((rock) => (
    <Rock key={rock.id} {...rock} />
  ));
};

export default Rocks;

//checked