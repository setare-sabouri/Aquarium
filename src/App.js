import { Canvas } from 'react-three-fiber'
import {  KeyboardControls, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf'
import Experience from './Components/Experience';
import './styles.scss'
import { KeyMaps } from './Globals/KeyMaps';


function App() {
  return (
    <KeyboardControls map={KeyMaps}>
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0, 7, 40]
      }}
    >
     
      <color args={["dodgerblue"]} attach={"background"} />
      <OrbitControls />
      <Experience />
      <axesHelper args={[7]} />
      <Perf position="top-left" />
    </Canvas>
    {/* <Interface/> */}
     </KeyboardControls>
  );
}

export default App;
