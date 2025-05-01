'use client';

import { useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

function TiltBox() {
  const ref = useRef<THREE.Group>(null);
  const [angles, setAngles] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_BROKER_URL || '', {
      username: process.env.NEXT_PUBLIC_MQTT_USER,
      password: process.env.NEXT_PUBLIC_MQTT_PASS,
      reconnectPeriod: 1000,
    });

    client.on('connect', () => {
      client.subscribe('accel/mini-bus-1', (err) => {
        if (!err) {
          console.log(`✅ Subscribed to accel/mini-bus-1`);
        }
      });
    });

    client.on('message', (_, message) => {
      try {
        const { x, y, z } = JSON.parse(message.toString());

        const pitch = Math.atan2(y, Math.sqrt(x * x + z * z)); // X-axis rotation
        const roll = Math.atan2(x, Math.sqrt(y * y + z * z));  // Y-axis rotation

        setAngles({ x: pitch, y: roll });
      } catch (err) {
        console.error('Invalid MQTT message', err);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = angles.x; // pitch
      ref.current.rotation.z = angles.y; // roll
    }
  });

  return (
    <group ref={ref}>
      {/* Main minibus body */}
      <mesh>
        <boxGeometry args={[1.5, 1.0, 4.5]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>

      {/* Directional Arrow (front) */}
      <mesh position={[0, 0.75, -2.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 0.5, 12]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Top gray box as indicator */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.8]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Text label above the orange box */}
      <Html position={[0, 0.8, 0]} center>
        <div style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
          TOP
        </div>
      </Html>
    </group>
  );
}

export default function TiltBox3D() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <TiltBox />
        <gridHelper args={[20, 20]} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
