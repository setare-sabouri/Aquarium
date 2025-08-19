import { Canvas } from 'react-three-fiber'
import { KeyboardControls } from '@react-three/drei';
import { Perf } from 'r3f-perf'
import Experience from './Components/Experience';
import './styles.scss'
import { KeyMaps } from './Components/Globals/KeyMaps';
import Interface from './Components/Interface/Interface';


function App() {
  return (
    <KeyboardControls map={KeyMaps}>
      <Canvas
        shadows
        camera={{
          fov: 45,    
          near: 0.1,
          far: 2000,
          position: [0, 6, 20]
        }}
      >
        <color args={["dodgerblue"]} attach={"background"} />
        <Experience />
        <axesHelper args={[7]} />
        <Perf position="top-left" />
      </Canvas>
      <Interface/>
    </KeyboardControls>
    
  );
}

export default App;
