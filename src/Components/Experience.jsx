import { Physics } from '@react-three/rapier';
import Lights from './Globals/Lights.jsx';
import Player from './Player/Player';
import AquariumInside from './AquariumInside/AquariumInside';
import AquariumOutside from './AquariumOutside.jsx/AquariumOutside.jsx';


const Experience = ({ playerRef }) => {
  return (
    <Physics>
      <Lights />
      <AquariumInside />
      <AquariumOutside />
      <Player ref={playerRef} />
    </Physics>
  );
};

export default Experience;
