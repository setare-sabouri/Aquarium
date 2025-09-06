import './styles.scss';
import { Canvas } from '@react-three/fiber';
import { Html, KeyboardControls, PointerLockControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Experience from './Components/Experience';
import { KeyMaps } from './Components/Globals/KeyMaps';
import Interface from './Components/Interface/Interface';
import { useLevaControls } from './Components/Globals/LevaControls';
import { Leva } from 'leva';
import BackgroundAudio from './Components/Globals/Sound';
import { Suspense, useRef } from 'react';
import Loading from './Components/Interface/Loading/Loading';

function App() {
  const { Scene:{BackGround,Performance} } = useLevaControls();
  const playerRef = useRef();

  return (
    <KeyboardControls map={KeyMaps}>
      <Canvas shadows camera={{ fov: 45, near: 0.1, far: 2000, position: [0, 6, 20] }}>
        <Suspense fallback={
          <Html>
            <Loading />
          </Html>
        }>
          <color args={[BackGround]} attach="background" />
          {Performance && <Perf position="top-left" />}
          <Experience playerRef={playerRef} />
          <PointerLockControls selector={null} />
        </Suspense>
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
