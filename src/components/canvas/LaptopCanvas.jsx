import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import Laptop from "../Laptop";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function LaptopCanvas() {
  return (
    <Canvas
      camera={{ position: [4, 2, 6], fov: 50 }}
      gl={{ alpha: true }}
      onCreated={(state) => {
        state.gl.setClearColor(0x000000, 0);
      }}
      style={{
        background: "transparent",
        width: "100%",
        height: "700px",
        margin: "0 auto",
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1.5} castShadow />

      <Laptop />
      <OrbitControls enableZoom={false} />
      <Preload all />
    </Canvas>
  );
}
