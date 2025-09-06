import './styles.scss';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, PointerLockControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Experience from './Components/Experience';
import { KeyMaps } from './Components/Globals/KeyMaps';
import Interface from './Components/Interface/Interface';
import { useLevaControls } from './Components/Globals/LevaControls';
import { Leva } from 'leva';
import BackgroundAudio from './Components/Globals/Sound';
import React, { useRef } from 'react';

function App() {
  const { Scene } = useLevaControls();
  const playerRef = useRef();

  return (
    <KeyboardControls map={KeyMaps}>
      <Canvas
        shadows
        camera={{ fov: 45, near: 0.1, far: 2000, position: [0, 6, 20] }}
      >
        <color args={[Scene.BackGround]} attach="background" />
        {Scene.Performance && <Perf position="top-left" />}
        <Experience playerRef={playerRef} />
        <PointerLockControls selector={null} />
      </Canvas>


      <div id="ui-overlay" onClick={(e) => e.stopPropagation()}>
        <Leva collapsed />
        <Interface playerRef={playerRef} />
        <BackgroundAudio />
      </div>

    </KeyboardControls>
  );
}

export default App;
