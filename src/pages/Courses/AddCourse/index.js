import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useFirestore } from 'reactfire'
import { collection, addDoc } from 'firebase/firestore'

import { message } from 'antd'
import { BulbOutlined } from '@ant-design/icons'

import Breadcrumbs from 'components/Breadcrumbs'
import { COLLECTIONS } from 'utils/constants'
import { routes } from 'routes/routes'
import CourseForm from '../CourseForm'

const breadcrumbs = [
    {
        route: routes.COURSES,
        icon: <BulbOutlined />,
        content: 'Cursos',
    },
    {
        route: routes.ADD_COURSE,
        content: 'Agregar curso'
    },
]

const AddCourse = () => {
    const navigate = useNavigate()
    const firestore = useFirestore()
    const coursesCollection = collection(firestore, COLLECTIONS.COURSES)

    const [loading, setLoading] = React.useState(false)

    const addCourse = async (data) => {
        try {
            setLoading(true)
            await addDoc(coursesCollection, data)
            message.success('Curso agregado correctamente')
            navigate(routes.COURSES)
        } catch (error) {
            console.info(error)
            message.error('Hubo un problema al intentar agregar el curso')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper">
                <CourseForm
                    onSubmit={addCourse}
                    loading={loading}
                    goBack={() => navigate(routes.COURSES)}
                />
            </div>
        </div>
    )
}

export default AddCourse