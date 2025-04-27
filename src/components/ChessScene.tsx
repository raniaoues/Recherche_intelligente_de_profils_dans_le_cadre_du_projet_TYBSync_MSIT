import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Employee } from '@/types/employee';

interface ChessSceneProps {
  profiles: Employee[];
  onProfileSelect: (profile: Employee) => void;
  searchQuery: string;
}

// Chess pawn component
const ChessPawn = ({ 
  position, 
  profile, 
  onClick, 
  isHovered, 
  setHovered,
  isVisible = true,
}: { 
  position: [number, number, number], 
  profile: Employee,
  onClick: () => void,
  isHovered: boolean,
  setHovered: (value: string | null) => void,
  isVisible?: boolean,
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState<THREE.Vector3>(new THREE.Vector3(1, 1, 1));
  
  // Animation for visibility
  useEffect(() => {
    if (isVisible) {
      setScale(new THREE.Vector3(1, 1, 1));
    } else {
      setScale(new THREE.Vector3(0, 0, 0));
    }
  }, [isVisible]);

  // Animation for hover and visibility
  useFrame(() => {
    if (!ref.current) return;
    
    // Handle hover animation
    if (isHovered) {
      ref.current.rotation.y += 0.01;
      ref.current.scale.lerp(new THREE.Vector3(1.2 * scale.x, 1.2 * scale.y, 1.2 * scale.z), 0.1);
    } else {
      ref.current.scale.lerp(scale, 0.1);
    }
  });

  if (!isVisible) return null;

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(profile.id.toString())}
      onPointerOut={() => setHovered(null)}
      onClick={onClick}
    >
      <mesh
        ref={ref}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.3, 0.4, 0.2, 32]} />
        <meshStandardMaterial
          color={isHovered ? "#4fc3f7" : "#81d4fa"}
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.8}
          emissive="#0288d1"
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color={isHovered ? "#4fc3f7" : "#81d4fa"}
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.8}
          emissive="#0288d1"
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>
      <Float
        speed={5}
        rotationIntensity={0.2}
        floatIntensity={0.2}
        position={[0, 1.2, 0]}
      >
        <Text
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {profile.nom}
        </Text>
      </Float>
    </group>
  );
};

// Chessboard component
const Chessboard = ({ 
  profiles, 
  onProfileSelect, 
  hoveredProfile,
  setHoveredProfile,
  searchQuery
}: {
  profiles: Employee[],
  onProfileSelect: (profile: Employee) => void,
  hoveredProfile: string | null,
  setHoveredProfile: (value: string | null) => void,
  searchQuery: string
}) => {
  return (
    <group>
      {/* Chessboard base */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#1a2035" />
      </mesh>
      
      {/* Grid lines */}
      {Array.from({ length: 9 }).map((_, i) => (
        <group key={`grid-line-${i}`}>
          {/* Horizontal lines */}
          <mesh position={[0, -0.99, i - 4]} rotation-x={-Math.PI / 2}>
            <boxGeometry args={[8, 0.05, 0.01]} />
            <meshStandardMaterial color="#3f51b5" emissive="#3f51b5" emissiveIntensity={0.4} transparent opacity={0.6} />
          </mesh>
          
          {/* Vertical lines */}
          <mesh position={[i - 4, -0.99, 0]} rotation-x={-Math.PI / 2}>
            <boxGeometry args={[0.05, 8, 0.01]} />
            <meshStandardMaterial color="#3f51b5" emissive="#3f51b5" emissiveIntensity={0.4} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
      
      {/* Place chess pawns for profiles - up to 8, with visibility controlled by search */}
      {profiles.slice(0, 8).map((profile, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const x = col * 2 - 3;
        const z = row * 2 - 1;
        
        const isVisible = profiles.some(p => p.id === profile.id);
        
        return (
          <ChessPawn
            key={profile.id}
            position={[x, 0, z]}
            profile={profile}
            onClick={() => onProfileSelect(profile)}
            isHovered={hoveredProfile === profile.id.toString()}
            setHovered={setHoveredProfile}
            isVisible={isVisible}
          />
        );
      })}
      
      {/* Decorative elements - Only keeping the neural network and puzzle pieces */}
      {/* Neural network decoration */}
      <group position={[-3, -0.5, 3]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={`node-${i}`} position={[Math.sin(i) * 0.3, Math.cos(i) * 0.3, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color="#64ffda" 
              emissive="#64ffda"
              emissiveIntensity={0.5} 
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
      
      {/* Puzzle pieces */}
      <group position={[2.5, -0.9, 2.5]}>
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <boxGeometry args={[0.6, 0.1, 0.6]} />
          <meshStandardMaterial 
            color="#7986cb" 
            metalness={0.7}
            roughness={0.2}
            emissive="#3f51b5"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
      <group position={[2.8, -0.8, 2.2]}>
        <mesh rotation={[Math.PI / 5, Math.PI / 3, 0]}>
          <boxGeometry args={[0.5, 0.1, 0.5]} />
          <meshStandardMaterial 
            color="#5c6bc0" 
            metalness={0.7}
            roughness={0.2}
            emissive="#3f51b5"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};

// Main component that creates the full 3D scene
export const ChessScene = ({ profiles, onProfileSelect, searchQuery }: ChessSceneProps) => {
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);

  return (
    <div className="h-[500px] relative rounded-2xl overflow-hidden shadow-2xl mb-10">
      <Canvas shadows camera={{ position: [0, 5, 7], fov: 45 }}>
        <fog attach="fog" args={['#070b34', 8, 25]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#5e35b1" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#0288d1" />
        
        <Suspense fallback={null}>
          <Chessboard 
            profiles={profiles} 
            onProfileSelect={onProfileSelect} 
            hoveredProfile={hoveredProfile}
            setHoveredProfile={setHoveredProfile}
            searchQuery={searchQuery}
          />
          <Environment preset="city" />
          <ContactShadows 
            opacity={0.4} 
            scale={10} 
            blur={1} 
            far={10} 
            resolution={256} 
            color="#000000" 
          />
        </Suspense>
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 2.2} 
          minPolarAngle={Math.PI / 6} 
        />
      </Canvas>
      
      {/* Search info overlay */}
      {searchQuery && (
        <div className="absolute bottom-5 left-0 right-0 text-center">
          <div className="inline-block bg-black/40 backdrop-blur-md rounded-full px-4 py-2 text-white">
            Résultats pour <span className="font-semibold">"{searchQuery}"</span>
          </div>
        </div>
      )}
    </div>
  );
};
