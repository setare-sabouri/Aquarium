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
import DesktopOnlyOverlay from './Components/Interface/orientationOverlay/OrientationOverlay';
import useBreakpoint from './Utils/useBreakpoint';


function App() {
  const { Scene: { BackGround, Performance } } = useLevaControls();
  const playerRef = useRef();

  // Mobile 
  const breakpoint = useBreakpoint()
  const KeyboardIsNeeded = breakpoint !== 'desktop' ;

  return (
    <>
      <KeyboardControls map={KeyMaps}>
        <DesktopOnlyOverlay show={KeyboardIsNeeded} />

        <Canvas camera={{ fov: 75, position: [0, 6, 20] }}>
          <Suspense fallback={<Html><Loading /></Html>}>
            <color args={[BackGround]} attach="background" />
            {/* {true && <Perf position="top-left" />} */}
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
    </>

  );
}

export default App;
