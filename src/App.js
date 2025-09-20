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
import RotateOverlay from './Components/Interface/orientationOverlay/OrientationOverlay';
import useOrientation from './Utils/useOrientation';
import useBreakpoint from './Utils/useBreakpoint';
import MobileControls from './Components/Interface/MobileControls/MobileControls';

function App() {
  const { Scene: { BackGround, Performance } } = useLevaControls();
  const playerRef = useRef();

  //responsivness 
  const breakpoint = useBreakpoint()
  const orientation = useOrientation()
  const rotateIsNeeded = breakpoint === 'mobile' && orientation === 'portrait';

  return (
    <>

      <KeyboardControls map={KeyMaps}>
        {(breakpoint === 'mobile' || breakpoint === 'tablet') && ( <MobileControls /> )}
        <RotateOverlay show={rotateIsNeeded} />

        <Canvas camera={{ fov: 75, position: [0, 6, 20] }}>
          <Suspense fallback={
            <Html>
              <Loading />
            </Html>
          }>
            <color args={[BackGround]} attach="background" />
            {Performance && <Perf position="top-left" />}
            <Experience playerRef={playerRef} />
            {breakpoint === 'desktop' && <PointerLockControls selector={null} />}

          </Suspense>
        </Canvas>

        <div id="ui-overlay" onClick={(e) => e.stopPropagation()}>
          <Leva collapsed />
          <Interface playerRef={playerRef} />
          <BackgroundAudio />
        </div>

      </KeyboardControls>
    </>

  );
}

export default App;
