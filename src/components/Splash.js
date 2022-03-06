import React, { useState } from 'react'

import { Button } from 'antd'

import App from '../App'

import './Splash.css'

import logo from '../assets/images/logo.svg'

const Splash = () => {
  const [showUnderConstruction, setShowUnderConstruction] = useState(false)

  const toggleShowUnderConstruction = () => {
    setShowUnderConstruction(!showUnderConstruction)
  }
  return (
    <div className="splash">
      { !showUnderConstruction
        ? (
          <header className="splash-header">
            <img src={logo} className="splash-logo" alt="logo" />
            <h3>terapias complementarias</h3>
            <h2>¡en construcción!</h2>
            <Button type="primary" onClick={toggleShowUnderConstruction}>
              Ver página en construcción
            </Button>
          </header>
        )
        : <App />
      }
    </div>
  )
}

export default Splash
