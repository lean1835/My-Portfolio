import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function Laptop(props) {
  const { scene } = useGLTF("/models/laptop2.glb");
  const ref = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Xoay model mỗi frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.5;
      ref.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.09}
      rotation={[0, Math.PI, 0]}
      {...props}
    />
  );
}
