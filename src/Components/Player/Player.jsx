import React, { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLevaControls } from '../Globals/LevaControls';
import Diver from "./Diver";
import { usePlayerStore } from "../../Store/useGame";


const Player = React.forwardRef((_, PlayerRef) => {
  const setPlayerPosition = usePlayerStore((state) => state.setPlayerPosition)

  // movement
  const { Player } = useLevaControls();
  const [, getKeys] = useKeyboardControls();
  const targetRotationY = useRef(0);

  useFrame((_, delta) => {
    if (!PlayerRef.current) return;

    // player position
    const pos = PlayerRef.current.translation(); 
    setPlayerPosition([pos.x, pos.y, pos.z]);


    //player movement
    const { forward, backward, left, right, jump } = getKeys();
    const Impulse = { x: 0, y: 0, z: 0 };

    if (forward) { Impulse.z -= Player.speed; targetRotationY.current = 0; }
    if (backward) { Impulse.z += Player.speed; targetRotationY.current = Math.PI; }
    if (left) Impulse.x -= Player.speed;
    if (right) Impulse.x += Player.speed;
    if (jump) Impulse.y += Player.jumpStrength;

    if (Impulse.x || Impulse.y || Impulse.z) {
      PlayerRef.current.applyImpulse(Impulse, true);
    }
  });

  return <Diver playerRef={PlayerRef} targetRotationY={targetRotationY} />;
});

export default Player;
