import './Splash.css'

import logo from '../assets/images/logo.svg'

const Splash = () => {
  return (
    <div className="splash">
      <header className="splash-header">
        <img src={logo} className="splash-logo" alt="logo" />
        <h3>terapias complementarias</h3>
        <h2>¡en construcción!</h2>
      </header>
    </div>
  )
}

export default Splash
