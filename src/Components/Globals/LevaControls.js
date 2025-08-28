import { useControls } from 'leva';

export function useLevaControls() {

  const Scene = useControls("Scene", {
    BackGround: "dodgerblue",
    Environment: { value: "lobby", options: ["city", "apartment", "night", "dawn", "forest", "lobby", "park", "studio", "sunset", "warehouse"] },
    Performance: false
  },
    {
      collapsed: true,
      color: "aquamarine"
    }
  )

  const Player = useControls("Player", {
    speed: { value: 10, min: 5, max: 20, step: 1 },
  },
    {
      collapsed: true,
      color: "mintcream"
    }

  )
  const TunnelMaterials = useControls("Tunnel", {
    opacity: { value: 0.4, min: 0, max: 1, step: 0.05 },
    roughness: { value: 0.5, min: 0, max: 2, step: 0.2 },
    metalness: { value: 0.5, min: 0, max: 2, step: 0.2 },
    color: "#fff",
    speed: { value: 0.09, min: 0.05, max: 0.3, step: 0.01 },
    normalScale: { value: 3, min: 0, max: 10, step: 1 },
    repeatX: { value: 2, min: 1, max: 10, step: 1 },
    repeatY: { value: 5, min: 1, max: 10, step: 1 },
  },
    {
      collapsed: true,
      color: "gold"
    }
  );


  return { TunnelMaterials, Scene, Player }

}
