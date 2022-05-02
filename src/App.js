import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from 'routes/routes'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { FirestoreProvider, AuthProvider, useFirebaseApp } from 'reactfire'

import NavWrapper from 'components/NavWrapper'

import AboutUs from 'pages/AboutUs'
import ComingSoon from 'components/ComingSoon'
import Home from 'pages/Home'
import LoginPage from 'pages/Login'
import Page404 from 'pages/Page404'


const App = () => {
  const firebaseApp = useFirebaseApp();
  const firestoreInstance = getFirestore(useFirebaseApp());
  const auth = getAuth(firebaseApp)
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        <NavWrapper>
          <Routes>
            <Route path={routes.CURSOS} element={<ComingSoon title="Cursos"/>} />
            <Route path={routes.BLOG} element={<ComingSoon title="Blog" />} />
            <Route path={routes.ABOUT_US} element={<AboutUs title="Nosotras" />} />
            <Route path={routes.ADMIN} element={<LoginPage title="Admin" />} />
            <Route path={routes.HOME} element={<Home />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </NavWrapper>
      </FirestoreProvider>
    </AuthProvider>
  )
}

export default App