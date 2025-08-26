import * as THREE from 'three';

//gives a random number between min and max.
export const randomInRange = (min, max) => Math.random() * (max - min) + min;


// calculates model size 
export const BoundingSize =(scene)=>{
        const boundingBox = new THREE.Box3().setFromObject(scene);
        const vec = new THREE.Vector3();
        boundingBox.getSize(vec);
        return vec
}