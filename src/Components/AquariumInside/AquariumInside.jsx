import { useMemo } from 'react';
import Tunnel from './Tunnel';
import Floor from './Floor';
import TextGlobal from '../Globals/TextGlobal';
import Rocks from './Rocks';

const AquariumInside = () => {
  const textPosition = useMemo(() => [-15,5, -35], []);
  const rockRanges = useMemo(() => ({
    count: 10,
    xRange: [-8.5, 8.5],
    yRange: [0.3, 0.4],
    zRange: [-10, -195],
    scaleRange: [0.09, 0.15],
  }), []);

  return (
    <>
      <TextGlobal text="Escape the  Tunnel" size={0.9} position={textPosition} rotation={[0, 0.5, 0]} />
      <Tunnel length={100} />
      <Floor length={100} />
      <Rocks {...rockRanges} />
    </>
  );
};

export default AquariumInside;
