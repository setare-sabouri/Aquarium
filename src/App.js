import { Canvas } from 'react-three-fiber'

import './styles.scss'
import Experience from './Components/Experience';
import { Environment, OrbitControls } from '@react-three/drei';
import Lights from './Globals/Lights';
import { Perf } from 'r3f-perf'

function App() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 3, 9]
      }}
    >
      <color args={["dodgerblue"]} attach={"background"} />
      <OrbitControls />
      <Lights />
      <Experience />
      <axesHelper args={[7]} />
      <Perf position="top-left" />
    </Canvas>
  );
}

export default App;
