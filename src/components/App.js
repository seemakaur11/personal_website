import { Suspense } from 'react'
import { FlyControls } from '@react-three/drei'

import Image from './Image'

const App = () => {
  return (
    <>
      <Suspense fallback={null}>
        <FlyControls rollSpeed={0.75} dragToLook />
      </Suspense>
    </>
  )
}

export default App
