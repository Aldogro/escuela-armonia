import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { message } from 'antd'
import { BulbOutlined } from '@ant-design/icons'
import Breadcrumbs from 'components/Breadcrumbs'
import CourseForm from '../CourseForm'

import { setDoc, doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'

import { routes } from 'routes/routes'
import { COLLECTIONS } from 'utils/constants'

const EditCourse = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)
    const breadcrumbs = [
        {
            route: routes.COURSES,
            icon: <BulbOutlined />,
            content: 'Cursos'
        },
        {
            route: `${routes.COURSES}/${id || ''}/edit`,
            content: 'Editar Curso'
        }
    ]

    const firestore = useFirestore()
    const ref = doc(firestore, COLLECTIONS.COURSES, id)
    const { data } = useFirestoreDocData(ref)
    const editCourse = async (data) => {
        try {
            setLoading(true)
            await setDoc(ref, data)
            message.success('Curso editado correctamente')
            navigate(routes.COURSES)
        } catch (error) {
            message.error('Hubo un problema al intentar editar el Curso')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper">
                <CourseForm
                    course={data}
                    onSubmit={editCourse}
                    loading={loading}
                    goBack={() => navigate(routes.COURSES)}
                />
            </div>
        </div>
    )
}

export default EditCourse