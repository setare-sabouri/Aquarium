import { useMemo } from 'react';
import { randomInRange, BoundingSize } from '../../Utils/Math';
import { useGLTF } from '@react-three/drei';
import Rock from './Rock';

const Rocks = ({
  count = 10,
  xRange = [-8, 8],
  yRange = [0.5, 0.5],
  zRange = [-50, -100],
  scaleRange = [0.1, 0.2],
}) => {
  const { scene } = useGLTF('./models/rock.glb');
  const baseRadius = useMemo(() => BoundingSize(scene).x / 2 || 0.5, [scene]);

  const rocks = useMemo(() =>
    Array.from({ length: count }).map(() => {
      const scale = randomInRange(scaleRange[0], scaleRange[1]);
      return {
        scale,
        rotationY: randomInRange(0, Math.PI * 2),
        position: [
          randomInRange(xRange[0], xRange[1]),
          randomInRange(yRange[0], yRange[1]),
          randomInRange(zRange[0], zRange[1]),
        ],
        radius: baseRadius * scale,
      };
    }),
  [count, xRange.join(''), yRange.join(''), zRange.join(''), scaleRange.join(''), baseRadius]);

  return (
    <>
      {rocks.map((rock, index) => (
        <Rock key={index} {...rock} />
      ))}
    </>
  );
};

export default Rocks;
