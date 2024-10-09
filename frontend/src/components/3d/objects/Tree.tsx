import { useEffect, useState } from "react"

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

export default function Tree({ count }: { count: number }) {
  const [trees, setTrees] = useState<[number, number, number][]>([]);
  const existingPositions = new Set<string>();

  useEffect(() => {
    const newTrees = Array.from({ length: count }, () => generateRandomPosition(existingPositions));
    setTrees(newTrees);
  }, [count]);

  return (
    <>
      {trees.map((position, index) => (
        <group position={position} key={index}>
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[1, 2, 8]} />
            <meshStandardMaterial color="#2ecc71" />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1]} />
            <meshStandardMaterial color="#795548" />
          </mesh>
        </group>
      ))}
    </>
  )
}
