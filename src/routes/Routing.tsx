import React from 'react'
import { ObservableStatus, SigninCheckResult, useSigninCheck } from 'reactfire'
import { Routes, Route } from 'react-router-dom'
import { routes } from 'routes/routes'
import ProtectedRoute from 'routes/ProtectedRoute'

const AddStaff = React.lazy(() => import('pages/AboutUs/AddStaff'))
const EditStaff = React.lazy(() => import('pages/AboutUs/EditStaff'))
const AboutUs = React.lazy(() => import('pages/AboutUs'))

const AddBlogEntry = React.lazy(() => import('pages/Blog/AddBlogEntry'))
const EditBlogEntry = React.lazy(() => import('pages/Blog/EditBlogEntry'))
const Blog = React.lazy(() => import('pages/Blog'))

const Courses = React.lazy(() => import('pages/Courses'))
const AddCourse = React.lazy(() => import('pages/Courses/AddCourse'))
const EditCourse = React.lazy(() => import('pages/Courses/EditCourse'))

const Home = React.lazy(() => import('pages/Home'))

const LoginPage = React.lazy(() => import('pages/Login'))

const Page404 = React.lazy(() => import('pages/Page404'))

const Routing = (): React.ReactElement => {
    const { data: user }: ObservableStatus<SigninCheckResult> = useSigninCheck()

    return (
        <Routes>
            <Route path={routes.ADD_COURSE} element={
              <ProtectedRoute user={user && user.signedIn}>
                <AddCourse />
              </ProtectedRoute>
            } />
            <Route path={routes.EDIT_COURSE} element={
              <ProtectedRoute user={user && user.signedIn}>
                <EditCourse />
              </ProtectedRoute>
            } />
            <Route path={routes.COURSES} element={<Courses />} />
            
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

            <Route path={routes.ADD_STAFF} element={
                <ProtectedRoute user={user && user.signedIn}>
                  <AddStaff />
                </ProtectedRoute>
              }
            />
            <Route path={routes.EDIT_STAFF} element={
                <ProtectedRoute user={user && user.signedIn}>
                  <EditStaff />
                </ProtectedRoute>
              }
            />
            <Route path={routes.ABOUT_US} element={<AboutUs title="Nosotras" />} />
            <Route path={routes.ADMIN} element={<LoginPage title="Admin" />} />
            <Route path={routes.HOME} element={<Home />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}

export default Routing