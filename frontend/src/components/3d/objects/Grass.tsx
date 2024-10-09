import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

function generateRandomPosition(existingPositions: Set<string>): [number, number, number] {
  let position: [number, number, number];
  let key: string;
  do {
    const x = Math.random() * 200 - 100;
    const z = Math.random() * 200 - 100;
    position = [x, 0, z];
    key = `${Math.floor(x)},${Math.floor(z)}`;
  } while (existingPositions.has(key));
  
  existingPositions.add(key);
  return position;
}

export default function Grass({ count }: { count: number }) {
  const instancedMesh = useRef<THREE.InstancedMesh>(null);
  const tempObject = new THREE.Object3D();
  const existingPositions = new Set<string>();

  useEffect(() => {
    if (instancedMesh.current) {
      for (let i = 0; i < count; i++) {
        const position = generateRandomPosition(existingPositions);
        tempObject.position.set(position[0], position[1], position[2]);
        tempObject.scale.setScalar(0.1 + Math.random() * 0.2);
        tempObject.rotation.y = Math.random() * Math.PI;
        tempObject.updateMatrix();
        instancedMesh.current.setMatrixAt(i, tempObject.matrix);
      }
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [count]);

  return (
    <instancedMesh ref={instancedMesh} args={[undefined, undefined, count]}>
      <coneGeometry args={[0.05, 0.5, 8]} />
      <meshStandardMaterial color="#4caf50" />
    </instancedMesh>
  )
}
