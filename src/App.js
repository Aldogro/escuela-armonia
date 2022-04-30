import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from 'routes/routes'

import NavWrapper from 'components/NavWrapper'
import ComingSoon from 'components/ComingSoon'
import Page404 from 'pages/Page404'
import Home from 'pages/Home'
import AboutUs from 'pages/AboutUs'

const App = () => {
  return (
    <NavWrapper>
      <Routes>
        <Route path={routes.CURSOS} element={<ComingSoon title="Cursos"/>} />
        <Route path={routes.BLOG} element={<ComingSoon title="Blog" />} />
        <Route path={routes.ABOUT_US} element={<AboutUs title="Nosotras" />} />
        <Route path={routes.ADMIN} element={<ComingSoon title="Admin" />} />
        <Route path={routes.HOME} element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </NavWrapper>
  )
}

export default App