import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import { MeshPhysicalMaterial } from 'three';

import cylinderSVG from "./assets/cylinder.svg";

function Gauge({ height, capHeight, score }) {
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

  // Liquid material with a shiny appearance
  const liquidMaterial = new MeshPhysicalMaterial({
    color: "green",
    reflectivity: 1,
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 1,
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Gauge Liquid */}
      <Cylinder ref={liquid} args={[0.88, 0.93, maxLiquidHeight, 64]} position={[0, -height / 1.5 + maxLiquidHeight / 1.5 + capHeight, 0]}>
        <primitive object={liquidMaterial} attach="material" />
      </Cylinder>
    </group>
  );
}

export default function CylinderGauge() {
  return (
    <div className="relative w-[300px] h-[450px]">
      <div className="absolute w-full h-full">
        <Canvas
          camera={{ position: [0, 5, 20], fov: 20 }}
        >
          <ambientLight intensity={5} />
          <Gauge height={7} capHeight={0.5} score={10} />
        </Canvas>
      </div>
      <img src={cylinderSVG} alt="Cylinder Gauge" className="absolute w-full h-full z-10" />
    </div>
  );
}
