import { useMemo } from 'react';
import { SkeletonUtils } from 'three-stdlib';


//to clone a GLTF scene
export const useCloneScene = (gltf) => {
  return useMemo(() => {
    if (!gltf?.scene) return null;
    return SkeletonUtils.clone(gltf.scene);
  }, [gltf]);
};
