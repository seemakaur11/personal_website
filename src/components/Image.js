// copied drei's Image component
import * as React from 'react'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { useTexture, shaderMaterial, Circle } from '@react-three/drei'
import { animated } from '@react-spring/three'

const ImageMaterialImpl = shaderMaterial(
  {
    color: new THREE.Color('white'),
    scale: [1, 1],
    imageBounds: [1, 1],
    map: null,
    zoom: 1,
    grayscale: 0,
  },
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
  }
`,
  /* glsl */ `
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float zoom;
  uniform float grayscale;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, 1.0), grayscale);

    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }
`,
)

export const CircleImage = React.forwardRef(
  (
    {
      children,
      color,
      segments = 1,
      scale = 1,
      zoom = 1,
      grayscale = 0,
      url,
      toneMapped,
      ...props
    },
    ref,
  ) => {
    extend({ ImageMaterial: ImageMaterialImpl })
    const texture = useTexture(url)
    const planeBounds = Array.isArray(scale)
      ? [scale[0], scale[1]]
      : [scale, scale]
    const imageBounds = [texture.image.width, texture.image.height]
    return (
      <Circle castShadow ref={ref} scale={scale} args={[0.5, 32, 0]} {...props}>
        <imageMaterial
          color={color}
          map={texture}
          zoom={zoom}
          grayscale={grayscale}
          scale={planeBounds}
          imageBounds={imageBounds}
          toneMapped={toneMapped}
          transparent
        />
        {children}
      </Circle>
    )
  },
)

const TransparentImage = React.forwardRef(
  (
    {
      children,
      color,
      segments = 1,
      scale = 1,
      zoom = 1,
      grayscale = 0,
      url,
      toneMapped,
      materialProps = {},
      ...props
    },
    ref,
  ) => {
    extend({ ImageMaterial: ImageMaterialImpl })
    const texture = useTexture(url)
    const planeBounds = Array.isArray(scale)
      ? [scale[0], scale[1]]
      : [scale, scale]
    const imageBounds = [texture.image.width, texture.image.height]
    return (
      <animated.mesh
        receiveShadow
        castShadow
        ref={ref}
        scale={scale}
        {...props}
      >
        <planeGeometry args={[1, 1, segments, segments]} />
        <imageMaterial
          color={color}
          map={texture}
          zoom={zoom}
          grayscale={grayscale}
          scale={planeBounds}
          imageBounds={imageBounds}
          toneMapped={toneMapped}
          transparent
          side={THREE.DoubleSide}
          {...materialProps}
        />
        {children}
      </animated.mesh>
    )
  },
)

export default TransparentImage
