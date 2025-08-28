import './styles.scss';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Experience from './Components/Experience';
import { KeyMaps } from './Components/Globals/KeyMaps';
import Interface from './Components/Interface/Interface';
import { useLevaControls } from './Components/Globals/LevaControls';
import { Leva } from 'leva';
import BackgroundAudio from './Components/Globals/Sound';
import React from 'react';

function App() {
  const { Scene } = useLevaControls();
  const playerRef = React.useRef();

  return (
    <KeyboardControls map={KeyMaps}>
      <Canvas
        shadows
        camera={{ fov: 45, near: 0.1, far: 2000, position: [0, 6, 20] }}
      >
        <color args={[Scene.BackGround]} attach={"background"} />
        {Scene.Performance && <Perf position="top-left" />}
        <Experience playerRef={playerRef} />
      </Canvas>

      <Leva collapsed/>
      <Interface playerRef={playerRef} /> 
      <BackgroundAudio/>
    </KeyboardControls>
  );
}

export default App;
