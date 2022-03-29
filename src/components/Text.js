import React from 'react'
import { useReflow } from '@react-three/flex'
import { Text as TextImpl } from '@react-three/drei'

const Text = ({
  weight = 'Regular',
  anchorX = 'left',
  anchorY = 'top',
  textAlign = 'left',
  ...props
}) => {
  const reflow = useReflow()
  const font = `/Inter Web/Inter-${weight}.woff`
  return (
    <TextImpl
      anchorX={anchorX}
      anchorY={anchorY}
      textAlign={textAlign}
      font={font}
      onSync={reflow}
      {...props}
    />
  )
}

export default Text
