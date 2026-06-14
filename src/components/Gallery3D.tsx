import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useEffect } from "react"
import * as THREE from "three"
import Scene from "./Scene"
import Overlay from "./Overlay"
import LoadingScreen from "./LoadingScreen"

const baseImages = [
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
  "https://images.unsplash.com/photo-1485575301924-6891ef935dcd?w=800&q=80",
]

const imageUrls = Array.from({ length: 16 }, (_, i) => baseImages[i % baseImages.length])

export default function Gallery3D() {
  const [textures, setTextures] = useState<THREE.Texture[]>([])

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = "anonymous"
    const result: THREE.Texture[] = new Array(imageUrls.length)
    let done = 0

    imageUrls.forEach((url, i) => {
      loader.load(
        url,
        (tex) => {
          result[i] = tex
          done++
          if (done === imageUrls.length) setTextures([...result])
        },
        undefined,
        () => {
          result[i] = new THREE.Texture()
          done++
          if (done === imageUrls.length) setTextures([...result])
        }
      )
    })
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: false }}>
        <Suspense fallback={null}>
          {textures.length > 0 && <Scene textures={textures} />}
        </Suspense>
      </Canvas>
      <Overlay />
      <LoadingScreen />
    </div>
  )
}
