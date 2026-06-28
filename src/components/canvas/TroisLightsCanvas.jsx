import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture, Text } from "@react-three/drei";
import { useRef, useState, useEffect, useLayoutEffect, Suspense, useMemo } from "react";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// Initialize RectAreaLight uniforms
RectAreaLightUniformsLib.init();

const Ground = () => {
  const textures = useTexture({
    map: "/textures/Wood_Tiles_002_basecolor.jpg",
    normalMap: "/textures/Wood_Tiles_002_normal.jpg",
  });

  useEffect(() => {
    if (textures.map) {
      textures.map.colorSpace = THREE.SRGBColorSpace;
    }
    Object.values(textures).forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(10, 10);
      texture.needsUpdate = true;
    });
  }, [textures]);

  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        {...textures}
        roughness={0.06}
        metalness={0.0}
      />
    </mesh>
  );
};

const CustomRectAreaLight = ({ color, position, label }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const lightRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Phase offset for asynchronous bobbing and swaying
  const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useLayoutEffect(() => {
    if (groupRef.current) {
      // Look at local [0, 0, 1] which is world [0, 1, 0] under -Math.PI / 2 rotation around X
      groupRef.current.lookAt(0, 1, 0);
    }
  }, []);

  useFrame((state, delta) => {
    // Easing factor (slower/smoother transition)
    const lerpFactor = 1 - Math.exp(-4 * delta);

    // 1. Hover & Base scale transition
    const targetScale = hovered ? 1.12 : 1.0;
    const currentScale = meshRef.current ? meshRef.current.scale.x : 1.0;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, lerpFactor);

    // 2. Weightless floating/bobbing (slower: multiplied elapsedTime by 0.6)
    const bobOffset = Math.sin(state.clock.elapsedTime * 0.6 + phaseOffset) * 0.18;
    
    // 3. Gentle rotation swaying (slower: multiplied elapsedTime by 0.3)
    const swayAngle = Math.sin(state.clock.elapsedTime * 0.3 + phaseOffset) * 0.04;

    if (meshRef.current) {
      meshRef.current.scale.setScalar(nextScale);
      meshRef.current.position.z = bobOffset;
      meshRef.current.rotation.y = swayAngle;
    }

    // 4. Easing light intensity (slower: multiplied elapsedTime by 1.0)
    if (lightRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.0 + phaseOffset) * 6;
      const targetI = hovered ? 160 : 50 + pulse;
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetI, lerpFactor);
      
      // Keep physical light emitter aligned with bobbing mesh
      lightRef.current.position.z = bobOffset;
    }

    if (textRef.current) {
      textRef.current.scale.setScalar(THREE.MathUtils.lerp(textRef.current.scale.x, targetScale * 1.08, lerpFactor));
      textRef.current.position.z = 0.06 + bobOffset;
      textRef.current.rotation.y = swayAngle;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* The physical light emitter */}
      <rectAreaLight
        ref={lightRef}
        color={color}
        intensity={50}
        width={5}
        height={5}
      />
      {/* The visual glowing rectangular plane (standing vertically) */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      {/* The 3D text rendered directly inside/on top of the glowing plane */}
      {label && (
        <Text
          ref={textRef}
          position={[0, 0, 0.06]} // Slightly offset in front of the plane to prevent z-fighting
          color="black"
          fontSize={0.4}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
          maxWidth={4.5}
          textAlign="center"
          outlineWidth={hovered ? 0.03 : 0}
          outlineColor="white"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

const FloatingPointLight = () => {
  const lightRef = useRef();
  // Create a horizontal plane at y = -2.9 (just above the wood floor at y = -3) in world coordinates
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.9), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  
  useFrame((state) => {
    if (lightRef.current) {
      // Manually update raycaster from camera every frame to account for OrbitControls auto-rotation
      state.raycaster.setFromCamera(state.pointer, state.camera);
      
      const res = state.raycaster.ray.intersectPlane(plane, target);
      if (res) {
        // Slower trail: lerp by 0.07 instead of 0.12 to make it slide lazily
        lightRef.current.position.lerp(target, 0.07);
      }
    }
  });

  return (
    <pointLight ref={lightRef} intensity={3.0} distance={15} decay={2}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </pointLight>
  );
};

// Custom Bloom Composer using vanilla Three.js postprocessing
const CustomBloom = () => {
  const { gl, scene, camera, size } = useThree();

  const composer = useMemo(() => {
    const comp = new EffectComposer(gl);
    comp.addPass(new RenderPass(scene, camera));

    // UnrealBloomPass parameters: resolution, strength, radius, threshold
    // Resolution is set to half (size / 2) for a massive GPU performance boost with identical blur quality!
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width / 2, size.height / 2),
      0.3,  // strength
      0.9,  // radius
      0.15  // threshold
    );
    comp.addPass(bloomPass);

    return comp;
  }, [gl, scene, camera, size.width, size.height]);

  useEffect(() => {
    composer.setSize(size.width, size.height);
  }, [composer, size.width, size.height]);

  useFrame(() => {
    gl.autoClear = false;
    composer.render();
  }, 1);

  return null;
};

export default function TroisLightsCanvas() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 3, 8], fov: 70 }}
        dpr={[1, 2]} // Limit device pixel ratio to 2 to prevent GPU rendering lag on high-DPI screens
        gl={{ alpha: false, antialias: true }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 1);
        }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "black",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.0} />
          
          <FloatingPointLight />

          <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <CustomRectAreaLight color="#ff6000" position={[0, 10, 1]} label="Toeic" />
            <CustomRectAreaLight color="#0060ff" position={[10, 0, 1]} label="Global e-commerce" />
            <CustomRectAreaLight color="#60ff60" position={[-10, 0, 1]} label="Graduation thesis" />
            <CustomRectAreaLight color="#ffffff" position={[0, -10, 1]} label="Handmade Leather" />
            <Ground />
          </group>

          <CustomBloom />
        </Suspense>

        <OrbitControls
          autoRotate
          autoRotateSpeed={4.5}
          enableDamping
          dampingFactor={0.05}
          enableZoom={false}
          target={[0, 0, 0]}
        />
        <Preload all />
      </Canvas>
    </>
  );
}
