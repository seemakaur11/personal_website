import React from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, Sky, Sphere, Ring, RoundedBox } from '@react-three/drei'
import { softShadows } from '@react-three/drei'
import { Interactive } from '@react-three/xr'

import { color, useTheme } from '../theme'

softShadows()

const sunPosition = [-3.5, 5.5, 6]

const App = () => {
  const { quality, toggleQuality, darkMode, toggleDarkMode } = useTheme()

  const sphereQuality = React.useRef(null)
  const sphereDarkMode = React.useRef(null)
  useFrame(({ clock }) => {
    if (!quality) return
    sphereQuality.current?.rotateX(Math.sin(clock.getElapsedTime()) * 0.02)
    sphereDarkMode.current?.rotateX(-Math.sin(clock.getElapsedTime()) * 0.02)
  })

  return (
    <>
      {darkMode ? (
        <>
          <Sky
            distance={450000}
            sunPosition={[-3.5, -2, 6]}
            inclination={0}
            azimuth={0}
          />
        </>
      ) : (
        <>
          <ambientLight />
          <Sky
            distance={450000}
            sunPosition={sunPosition}
            inclination={0}
            azimuth={0}
          />
          {quality && <fog attach="fog" args={['white', 0, 75]} />}
          <directionalLight
            castShadow={quality}
            position={sunPosition}
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={25}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
        </>
      )}

      {!darkMode && (
        <Interactive onSelect={toggleQuality}>
          <RoundedBox
            args={[0.5, 0.85, 0.5]}
            radius={0.25}
            smoothness={32}
            ref={sphereQuality}
            receiveShadow
            castShadow
            position={[1, 2.25, -3.5]}
            onClick={toggleQuality}
          >
            <meshPhongMaterial color={color.logo} attach="material" />
          </RoundedBox>
        </Interactive>
      )}
      <Interactive onSelect={toggleDarkMode}>
        <RoundedBox
          args={[0.5, 0.85, 0.5]}
          radius={0.25}
          smoothness={32}
          ref={sphereDarkMode}
          receiveShadow
          castShadow
          position={[1.75, 2.25, -3.5]}
          onClick={toggleDarkMode}
        >
          <meshPhongMaterial color="yellow" attach="material" />
        </RoundedBox>
      </Interactive>

      {darkMode ? (
        <Plane
          rotation-x={-Math.PI / 2}
          position={[0, -0.1, 0]}
          args={[100, 100, 4, 4]}
        >
          <meshBasicMaterial
            color="black"
            attach="material"
            opacity={0.5}
            transparent
          />
        </Plane>
      ) : (
        <>
          <Plane
            receiveShadow
            rotation-x={-Math.PI / 2}
            position={[0, -0.1, 0]}
            args={[100, 100, 4, 4]}
          >
            <shadowMaterial attach="material" opacity={0.5} transparent />
          </Plane>
          <Plane
            rotation-x={-Math.PI / 2}
            position={[0, -0.1, 0]}
            args={[100, 100, 4, 4]}
          >
            <meshBasicMaterial
              color="green"
              attach="material"
              opacity={0.5}
              transparent
            />
          </Plane>
        </>
      )}
    </>
  )
}

export default App
