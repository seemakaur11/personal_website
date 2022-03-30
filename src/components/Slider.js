import { Flex, Box } from '@react-three/flex'

import Image from './Image'

const Slider = ({ images }) => {
  return (
    <Flex position={[0, 1, 0]} flexDirection="row">
      {images.map((url, i) => (
        <Box key={i} marginRight={0.1} width={1}>
          <Image url={url} materialProps={{ opacity: 0.1 }} />
        </Box>
      ))}
    </Flex>
  )
}

export default Slider
