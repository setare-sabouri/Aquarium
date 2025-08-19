import { useControls } from 'leva';

export function useLevaControls() {
  const TunnelMaterials=useControls("Tunnel Material", {
    opacity: { value: 0.4, min: 0, max: 1, step: 0.05 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.05 },
    metalness: { value: 0.1, min: 0, max: 1, step: 0.05 },
    color: "#1b4d6b",
    speed: { value: 0.1, min: 0, max: 0.5, step: 0.01 }, // wave speed
    normalScale: { value: 1.5, min: 0, max: 5, step: 0.1 }, // wave depth
    repeatX: { value: 2, min: 1, max: 10, step: 1 },        // tiling horizontal
    repeatY: { value: 3, min: 1, max: 20, step: 1 },        // tiling vertical
  },
    {
      collapsed: true,
      color:"gold"
    }
  );

  const Scene =useControls("Scene Setting",{
    BackGround :"dodgerblue",
    Performance:false
  },
  {
    collapsed:true,
    color:"aquamarine"
  }
)

  return {TunnelMaterials, Scene}

}
