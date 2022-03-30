import { Suspense } from 'react'
import { FlyControls } from '@react-three/drei'

import Image from './Image'
import Slider from './Slider'

const App = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Slider
          images={[
            '/slide-1.jpg',
            '/slide-2.jpg',
            '/slide-1.jpg',
            '/slide-2.jpg',
            '/slide-1.jpg',
            '/slide-2.jpg',
            '/slide-1.jpg',
            '/slide-2.jpg',
          ]}
        />

        <FlyControls rollSpeed={0.75} dragToLook />
      </Suspense>
    </>
  )
}

export default App
