import React from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three';
import cylinderTube from "./cylinder.png";

import cylinder from "./cylinder.svg";

import './App.css';

export default function Test() {
  const height = 3;

  const cylinder = new THREE.CylinderGeometry( 1, 1, height, 32 );

  return (
    <div className="w-[200px] h-[500px] relative">
      <Canvas
        pixelRatio={window.devicePixelRatio}
        camera={{ position: [5, 2, 2] }}
        shadows
      >
        {/* <ambientLight intensity={3} /> */}
        {/* <pointLight position={[0, 2, 5]} intensity={5} /> */}
        {/* <spotLight position={[0, 5, 0]} intensity={30} penumbra={1} angle={0.95} castShadow /> */}
        <hemisphereLight intensity={4} />
        <directionalLight intensity={4} castShadow />
        
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <primitive object={cylinder} attach={"geometry"} />
          <meshStandardMaterial color="#00A632" />
        </mesh>
      </Canvas>
      {/* <img 
        src={cylinderTube} 
        alt="Cylinder Tube" 
        className="absolute top-0 left-0 w-full h-full" 
        style={{ zIndex: 2 }}
      /> */}
    </div>
  );
}
