import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, OrbitControls, SpotLight } from '@react-three/drei';

function Gauge({ height = 5, capHeight = 0.2 }) {
  const mesh = useRef();
  const liquid = useRef();
  
  // Max liquid height is height - 2 * capHeight
  const maxLiquidHeight = height - 2 + capHeight;

  useFrame((state, delta) => {
    // Adjust liquid level
    let liquidLevel = ((Math.sin(state.clock.getElapsedTime()) + 1) / maxLiquidHeight);
    liquid.current.scale.y = liquidLevel;
    liquid.current.position.y = -height / 2 + liquidLevel / 2 + capHeight;
  });

  return (
    <group ref={mesh} position={[0, 0, 0]}>
      {/* Gauge Shell */}
      <Cylinder args={[1, 1, height, 32]}>
        <meshStandardMaterial attach="material" transparent opacity={0.6} color="white" />
      </Cylinder>

      {/* Gauge Bottom Cap */}
      <Cylinder position={[0, -height / 2, 0]} args={[1, 1, capHeight, 32]}>
        <meshStandardMaterial attach="material" color="gray" />
      </Cylinder>

      {/* Gauge Top Cap */}
      <Cylinder position={[0, height / 2, 0]} args={[1, 1, capHeight, 32]}>
        <meshStandardMaterial attach="material" color="gray" />
      </Cylinder>

      {/* Gauge Liquid */}
      <Cylinder ref={liquid} args={[0.9, 0.9, maxLiquidHeight, 32]} position={[0, -height / 2 + maxLiquidHeight / 2 + capHeight, 0]}>
        <meshStandardMaterial attach="material" color="lightblue" />
      </Cylinder>
    </group>
  );
}

export default function App() {
  return (
    <div className="w-[300px] h-[500px]">
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} />
        <SpotLight position={[10, 15, 10]} angle={0.3} />
        <Gauge height={5} />
      </Canvas>
    </div>
  );
}
