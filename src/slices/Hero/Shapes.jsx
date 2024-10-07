"use client";

import { ContactShadows, Environment, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      rate: 0.3,
      geometry: new THREE.IcosahedronGeometry(3), // Gem
    },
    {
      position: [1, -0.75, 4],
      rate: 0.4,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // Pill
    },
    {
      position: [-1.4, 2, -4],
      rate: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.5), // Ball
    },
    {
      position: [-0.8, -0.75, 5],
      rate: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.28, 26, 86), // Donut
    },
    {
      position: [1.6, 1.6, -4],
      rate: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5), // Diamond
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({
      color: 0xf1c40f,
      roughness: 0.4,
      metalness: 0.3,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xc0392b,
      roughness: 0.4,
      metalness: 0.3,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xf39c12,
      roughness: 0.4,
      metalness: 0.3,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x8e44ad,
      roughness: 0.5,
      metalness: 0.2,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2980b9,
      roughness: 0.2,
      metalness: 0.5,
    }),
  ];

  const soundEffects = [
    new Audio("/sounds/knock1.ogg"),
    new Audio("/sounds/knock2.ogg"),
    new Audio("/sounds/knock3.ogg"),
  ];

  return geometries.map(({ position, rate, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      materials={materials}
      rate={rate}
      soundEffects={soundEffects}
    />
  ));
}

function Geometry({ rate, position, geometry, materials, soundEffects }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;
    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useGSAP(
    () => {
      setVisible(true);
      const randomDuration = Math.random() * 2 + 1;

      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: randomDuration,
        ease: "elastic.out(1,0.3)",
        delay: 0.3,
      });
    },
    { scope: meshRef },
  );

  return (
    <group position={position} ref={meshRef}>
      <Float
        speed={5 * rate}
        rotationIntensity={6 * rate}
        floatIntensity={5 * rate}
      >
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}
