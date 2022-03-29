import React from 'react'
import ReactDOM from 'react-dom'
import { VRCanvas, DefaultXRControllers } from '@react-three/xr'

import './index.css'
import App from './components/App'
import Environment from './components/Environment'

ReactDOM.render(
  <React.StrictMode>
    <VRCanvas shadows dpr={window.devicePixelRatio}>
      <DefaultXRControllers />
      <Environment />
      <App />
    </VRCanvas>
  </React.StrictMode>,
  document.getElementById('root'),
)
