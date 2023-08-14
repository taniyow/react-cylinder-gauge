import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import { MeshPhysicalMaterial } from 'three';

function Gauge({ height, capHeight = 0.2, score }) {
  const liquid = useRef();
  
  // Max liquid height is height - capHeight * 2
  const maxLiquidHeight = height - capHeight * 2;

  useFrame(() => {
    // Calculate liquid level based on the score (0 to 10)
    const liquidLevel = (score / 10) * maxLiquidHeight;

    // Adjust the liquid scale
    liquid.current.scale.y = liquidLevel / maxLiquidHeight;

    // Adjust the liquid position (considering the scaling)
    liquid.current.position.y = -height / 2 + capHeight + (liquidLevel / 2);
  });

  // Create a reflective material for the glass
  const glassMaterial = new MeshPhysicalMaterial({
    color: "white",
    emissive: "black",
    transparent: true,
    opacity: 0.3,
    metalness: 0.5,
    reflectivity: 1,
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 1,
  });

  // Liquid material with a shiny appearance
  const liquidMaterial = new MeshPhysicalMaterial({
    color: "green",
    emissive: "black",
    reflectivity: 1,
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 1,
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Gauge Shell */}
      <Cylinder args={[1, 1, height, 64]}>
        <primitive object={glassMaterial} attach="material" />
      </Cylinder>

      {/* Gauge Bottom Cap */}
      <Cylinder position={[0, -height / 2, 0]} args={[1, 1, capHeight, 64]}>
        <meshStandardMaterial attach="material" color="gray" />
      </Cylinder>

      {/* Gauge Top Cap */}
      <Cylinder position={[0, height / 2, 0]} args={[1, 1, capHeight, 64]}>
        <meshStandardMaterial attach="material" color="gray" />
      </Cylinder>

      {/* Gauge Liquid */}
      <Cylinder ref={liquid} args={[0.9, 0.9, maxLiquidHeight, 64]} position={[0, -height / 2 + maxLiquidHeight / 2 + capHeight, 0]}>
        <primitive object={liquidMaterial} attach="material" />
      </Cylinder>
    </group>
  );
}

export default function App() {
  return (
    <div className="w-[300px] h-[500px]">
      <Canvas
        camera={{ position: [0, 5, 12], fov: 40 }}
      >
        <ambientLight intensity={5} />
        {/* <pointLight position={[10, 10, 10]} /> */}
        <Gauge height={5} score={5} />
      </Canvas>
    </div>
  );
}
