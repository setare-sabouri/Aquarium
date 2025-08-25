import { useMemo } from 'react';
import Tunnel from './Tunnel';
import Floor from './Floor';
import Bubble from './Bubbles';
import TextGlobal from '../Globals/TextGlobal';
import Rocks from './Rock';

const AquariumInside = () => {
  // Memoized props to prevent unnecessary re-renders
  const textPosition = useMemo(() => [-5, 5, -15], []);
  const bubblePosition = useMemo(() => [-5, 0, -45], []);
  const rockRanges = useMemo(() => ({
    count: 10,
    xRange: [-9, 9],
    yRange: [0.3, 0.5],
    zRange: [-5, -200],
    scaleRange: [0.04, 0.17],
  }), []);

  return (
    <>
      <TextGlobal text="AQ Tunnel" size={0.9} position={textPosition} rotation={[0, 0.5, 0]} />
      <Tunnel length={100} />
      <Floor length={100} />
      {/* <Bubble position={bubblePosition} /> */}
      <Rocks {...rockRanges} />
    </>
  );
};

export default AquariumInside;
