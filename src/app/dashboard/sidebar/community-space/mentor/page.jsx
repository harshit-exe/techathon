"use client"
import { Experience } from "@/components/Disha/Experience";
import { UI } from "@/components/Disha/UI";
import { ChatProvider } from "@/hooks/useChat";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import './style.css'
function App() {
  return (<>
      <Loader />
      <Leva   hidden/>
      <UI />
      <Canvas className="" shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience />
      </Canvas>
  </>
  );
}

export default App;
