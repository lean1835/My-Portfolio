import { useGLTF, useAnimations } from "@react-three/drei"; 
import { useRef, useState, useEffect } from "react"; 


export default function Uia(props) {
  const ref = useRef();
  const { scene, animations } = useGLTF("/models/cat/source/uia.glb");
  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    const action = actions["Take 001"];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }
    return () => {
      action?.fadeOut(0.5); 
    };
  }, [actions]);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={5.5}
      rotation={[0, Math.PI, 0]}
      {...props}
    />
  );
}
