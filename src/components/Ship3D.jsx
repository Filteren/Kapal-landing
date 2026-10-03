import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BOX_COLORS = ['#fbbf24', '#38bdf8', '#f4f7fa', '#34d399', '#f87171', '#fb923c']

/* Ombak: plane yang verteksnya dianimasikan tiap frame */
function Ocean() {
  const geo = useMemo(() => new THREE.PlaneGeometry(70, 70, 44, 44), [])
  const pos = useMemo(() => geo.attributes.position, [geo])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      pos.setZ(
        i,
        Math.sin(x * 0.35 + t * 1.2) * 0.35 + Math.cos(y * 0.3 + t * 0.9) * 0.35
      )
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
  })

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#14649e" roughness={0.32} metalness={0.15} />
    </mesh>
  )
}

/* Kapal kontainer prosedural */
function Ship() {
  const group = useRef()

  const hullGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-7.5, -1.9)
    s.lineTo(3.5, -1.9)
    s.quadraticCurveTo(6.5, -1.4, 8.6, 0)
    s.quadraticCurveTo(6.5, 1.4, 3.5, 1.9)
    s.lineTo(-7.5, 1.9)
    s.closePath()
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 2.1, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.3, bevelSegments: 2,
    })
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  const boxes = useMemo(() => {
    const arr = []
    let i = 0
    for (let cx = -5.4; cx <= 2.4; cx += 1.62) {
      for (const cz of [-0.95, 0.95]) {
        arr.push({ x: cx, z: cz, y: 1.68, c: BOX_COLORS[i++ % BOX_COLORS.length] })
        if ((i + Math.round(cx)) % 3 !== 0) {
          arr.push({ x: cx, z: cz, y: 2.82, c: BOX_COLORS[(i + 2) % BOX_COLORS.length] })
        }
      }
    }
    return arr
  }, [])

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime()
    const g = group.current
    if (!g) return
    /* Mengapung */
    g.position.y = Math.sin(t * 1.15) * 0.28
    g.rotation.z = Math.sin(t * 0.85) * 0.03
    g.rotation.x = Math.cos(t * 0.65) * 0.018
    /* Parallax mouse */
    const targetY = -0.35 + state.pointer.x * 0.55
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, dt)
    const targetX = -state.pointer.y * 0.12
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, Math.cos(t * 0.65) * 0.018 + targetX, 3, dt)
  })

  return (
    <group ref={group} position={[0, 0.4, 0]}>
      {/* Lambung */}
      <mesh geometry={hullGeo} position={[0, -1.3, 0]}>
        <meshStandardMaterial color="#17507e" roughness={0.45} metalness={0.35} />
      </mesh>
      {/* Garis air */}
      <mesh position={[0, -0.28, 0]}>
        <boxGeometry args={[11.2, 0.22, 4.55]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.5} />
      </mesh>
      {/* Peti kemas */}
      {boxes.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]}>
          <boxGeometry args={[1.5, 1.1, 1.7]} />
          <meshStandardMaterial color={b.c} roughness={0.6} metalness={0.1} />
        </mesh>
      ))}
      {/* Anjungan */}
      <mesh position={[-6.1, 2.35, 0]}>
        <boxGeometry args={[1.9, 2.5, 2.7]} />
        <meshStandardMaterial color="#eef4f9" roughness={0.5} />
      </mesh>
      <mesh position={[-6.1, 3.05, 0]}>
        <boxGeometry args={[1.95, 0.55, 2.75]} />
        <meshStandardMaterial color="#0b2c4d" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Cerobong */}
      <mesh position={[-4.4, 2.6, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 1.6, 20]} />
        <meshStandardMaterial color="#b45309" roughness={0.5} />
      </mesh>
      <mesh position={[-4.4, 3.35, 0]}>
        <cylinderGeometry args={[0.47, 0.47, 0.25, 20]} />
        <meshStandardMaterial color="#0b2c4d" roughness={0.5} />
      </mesh>
      {/* Tiang haluan */}
      <mesh position={[7.4, 2.1, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 2.4, 10]} />
        <meshStandardMaterial color="#0b2c4d" roughness={0.5} />
      </mesh>
      <mesh position={[7.4, 3.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 8]} />
        <meshStandardMaterial color="#0b2c4d" roughness={0.5} />
      </mesh>
    </group>
  )
}

export default function Ship3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [12.8, 7.2, 15], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#cfe8ff', '#0e3a5c', 0.75]} />
      <directionalLight position={[6, 9, 5]} intensity={1.6} color="#fff5e0" />
      <directionalLight position={[9, 4, 12]} intensity={0.55} color="#bfe0ff" />
      <directionalLight position={[-7, 4, -6]} intensity={0.6} color="#fbbf24" />
      <Ocean />
      <Ship />
      {/* Bayangan lembut di bawah kapal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[7.5, 40]} />
        <meshBasicMaterial color="#041626" transparent opacity={0.3} depthWrite={false} />
      </mesh>
    </Canvas>
  )
}
