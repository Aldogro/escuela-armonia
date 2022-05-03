import React from 'react'
import { useSigninCheck } from 'reactfire'
import { Routes, Route } from 'react-router-dom'
import { routes } from 'routes/routes'
import ProtectedRoute from 'routes/ProtectedRoute'

import AboutUs from 'pages/AboutUs'
import AddBlogEntry from 'pages/Blog/AddBlogEntry'
import Blog from 'pages/Blog'
import ComingSoon from 'components/ComingSoon'
import Home from 'pages/Home'
import LoginPage from 'pages/Login'
import Page404 from 'pages/Page404'

const Routing = () => {
    const { data: user } = useSigninCheck()

    return (
        <Routes>
            <Route path={routes.CURSOS} element={<ComingSoon title="Cursos"/>} />
            <Route path={routes.ADD_BLOG_ENTRY} element={
              <ProtectedRoute user={user && user.signedIn}>
                <AddBlogEntry />
              </ProtectedRoute>
            } />
            <Route path={routes.BLOG} element={<Blog />} />
            <Route path={routes.ABOUT_US} element={<AboutUs title="Nosotras" />} />
            <Route path={routes.ADMIN} element={<LoginPage title="Admin" />} />
            <Route path={routes.HOME} element={<Home />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}

export default Routing