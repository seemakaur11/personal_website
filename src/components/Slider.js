import { useEffect, useState } from 'react'
import { Flex, Box } from '@react-three/flex'
import { useSpring, animated } from '@react-spring/three'

import Image from './Image'
import Text from './Text'

const Slide = ({ url, active, activeIndex, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  useEffect(() => setTimeout(() => setImageLoaded(true), 2000))
  const x = index * 1.1
  const { position, rotation, scale } = useSpring({
    position: [x + -activeIndex * 1.1, 0, active ? 0 : -1],
    rotation: [0, active ? 0 : activeIndex > index ? 1 : -1, 0],
    scale: 1,
  })

  return (
    // <Box marginRight={0.1} centerAnchor width={1} height={1}>
    <Image
      position={position}
      rotation={rotation}
      url={url}
      {...(active
        ? { color: '#fff', grayscale: 0 }
        : { color: '#f00', grayscale: 1 })}
    />
    // </Box>
  )
}

const Slider = ({ images }) => {
  const [active, setActiveNaive] = useState(0)
  const setActive = (i) =>
    setActiveNaive(i >= images.length ? images.length - 1 : i < 0 ? 0 : i)

  return (
    <Flex position={[0, 2, 0]}>
      <Box flexDirection="row" flexGrow={1}>
        <Box>
          <Text
            color="#000"
            fontSize={0.1}
            onClick={() => setActive(active - 1)}
          >
            ← Previous
          </Text>
        </Box>
        <Box flexGrow={1}></Box>
        <Box>
          <Text
            color="#000"
            fontSize={0.1}
            onClick={() => setActive(active + 1)}
          >
            Next →
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" key="slider" width={1} height={1} centerAnchor>
        {images.map((url, i) => (
          <Slide
            key={i}
            url={url}
            index={i}
            active={active === i}
            activeIndex={active}
          />
        ))}
      </Box>
    </Flex>
  )
}

export default Slider
