import { useMemo } from 'react';
import Tunnel from './Tunnel';
import Floor from './Floor';
import TextGlobal from '../Globals/TextGlobal';
import Rocks from './Rocks';
import { usePlayerStore } from '../../Store/useGame';

const AquariumInside = () => {

  const rockRanges = useMemo(() => ({
    xRange: [-8.5, 8.5],
    yRange: [0.3, 0.4],
    zRange: [-10, -195],
    scaleRange: [0.09, 0.15],
  }), []);

  const {length, width} = usePlayerStore((state) => state);
  return (
    <>
      <TextGlobal text="Escape" size={0.9} position={[-5,5, -30]} rotation={[0, 0.4, 0]} /> 
      <Tunnel length={length} width={width} />
      <Floor length={length} width={width}/>
      <Rocks {...rockRanges} />
    </>
  );
};

export default AquariumInside;
