import React, { useEffect, useState } from "react"
import { Cloud as DreiCloud } from "@react-three/drei"

function generateRandomPosition(existingPositions: Set<string>): [number, number, number] {
  let position: [number, number, number];
  let key: string;
  do {
    const x = Math.random() * 200 - 100;
    const z = Math.random() * 200 - 100;
    const y = 8 + Math.random() * 4;
    position = [x, y, z];
    key = `${Math.floor(x)},${Math.floor(z)}`;
  } while (existingPositions.has(key));
  
  existingPositions.add(key);
  return position;
}

export default function Cloud({ count }: { count: number }) {
  const [clouds, setClouds] = useState<[number, number, number][]>([]);
  const existingPositions = new Set<string>();

  useEffect(() => {
    const newClouds = Array.from({ length: count }, () => generateRandomPosition(existingPositions));
    setClouds(newClouds);
  }, [count]);

  return (
    <>
      {clouds.map((position, index) => (
        <DreiCloud
          key={index}
          position={position}
          speed={1}
          opacity={1}
        />
      ))}
    </>
  )
}
