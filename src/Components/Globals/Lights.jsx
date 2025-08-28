import React, { memo } from 'react';
import { Environment as DreiEnvironment } from '@react-three/drei';
import { useLevaControls } from './LevaControls';

const Lights = memo(() => {
const { Scene: { Environment } } = useLevaControls();


  return (
    <>
      <ambientLight intensity={2} color={"#060a7e"} />
      <DreiEnvironment preset={Environment} background={false} />
      <fog attach="fog" args={["#0d1b2a", 0.1, 45]} />
    </>
  );
});

export default Lights;
