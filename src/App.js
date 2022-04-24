import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from 'routes/routes'

import NavWrapper from 'components/NavWrapper'
import ComingSoon from 'components/ComingSoon'
import Home from 'pages/Home'

const App = () => {
  return (
    <NavWrapper>
      <Routes>
        <Route path={routes.CURSOS} element={<ComingSoon title="Cursos"/>} />
        <Route path={routes.BLOG} element={<ComingSoon title="Blog" />} />
        <Route path={routes.CONTACTO} element={<ComingSoon title="Contacto" />} />
        <Route path={routes.ADMIN} element={<ComingSoon title="Admin" />} />
        <Route path={routes.HOME} element={<Home />} />
      </Routes>
    </NavWrapper>
  )
}

export default App