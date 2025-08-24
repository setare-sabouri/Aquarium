import { useControls } from 'leva';

export function useLevaControls() {
  const TunnelMaterials = useControls("Tunnel Material", {
    opacity: { value: 0.4, min: 0, max: 1, step: 0.05 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.05 },
    metalness: { value: 0.1, min: 0, max: 1, step: 0.05 },
    color: "#fff",
    speed: { value: 0.09, min: 0.05, max: 0.3, step: 0.01 },
    normalScale: { value: 2, min: 0, max: 10, step: 1 },
    repeatX: { value: 2, min: 1, max: 10, step: 1 },
    repeatY: { value: 4, min: 1, max: 10, step: 1 },
    displacementScale: { value: 0.7, min: 0.5, max: 1, step: 0.1 },
  },
    {
      collapsed: true,
      color: "gold"
    }
  );

  const Scene = useControls("Scene Setting", {
    BackGround: "dodgerblue",
    Performance: true
  },
    {
      collapsed: true,
      color: "aquamarine"
    }
  )

  const Player = useControls("Player", {
    speed: { value: 10, min: 5, max: 20, step: 1 },
    jumpStrength:{value:9,min:5,max:20,step:1}
  },
     {
      collapsed: true,
      color: "mintcream"
    }
  
  )


  return { TunnelMaterials, Scene,Player }

}
