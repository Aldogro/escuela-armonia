import React from 'react'
import { useSigninCheck } from 'reactfire'
import { Routes, Route } from 'react-router-dom'
import { routes } from 'routes/routes'
import ProtectedRoute from 'routes/ProtectedRoute'

const AboutUs = React.lazy(() => import('pages/AboutUs'))
const AddBlogEntry = React.lazy(() => import('pages/Blog/AddBlogEntry'))
const EditBlogEntry = React.lazy(() => import('pages/Blog/EditBlogEntry'))
const Blog = React.lazy(() => import('pages/Blog'))
const ComingSoon = React.lazy(() => import('components/ComingSoon'))
const Home = React.lazy(() => import('pages/Home'))
const LoginPage = React.lazy(() => import('pages/Login'))
const Page404 = React.lazy(() => import('pages/Page404'))

const Routing = () => {
    const { data: user } = useSigninCheck()

    return (
        <Routes>
            <Route path={routes.CURSOS} element={<ComingSoon title="Cursos"/>} />
            <Route path={routes.ADD_BLOG_ENTRY} element={
                <ProtectedRoute user={user && user.signedIn}>
                  <AddBlogEntry />
                </ProtectedRoute>
              }
            />
            <Route path={routes.EDIT_BLOG_ENTRY} element={
                <ProtectedRoute user={user && user.signedIn}>
                  <EditBlogEntry />
                </ProtectedRoute>
              }
            />
            <Route path={routes.BLOG} element={<Blog />} />
            <Route path={routes.ABOUT_US} element={<AboutUs title="Nosotras" />} />
            <Route path={routes.ADMIN} element={<LoginPage title="Admin" />} />
            <Route path={routes.HOME} element={<Home />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}

export default Routing