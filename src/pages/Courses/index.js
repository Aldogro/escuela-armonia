import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useFirestore, useFirestoreCollectionData, useSigninCheck } from 'reactfire'
import { collection, query, orderBy, where } from 'firebase/firestore'

import { BulbOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'

import CourseCard from './CourseCard'
import Breadcrumbs from 'components/Breadcrumbs'

import { COLLECTIONS } from 'utils/constants'
import './Courses.css'

const breadcrumbs = [
    {
        route: '/courses',
        icon: <BulbOutlined />,
        content: 'Cursos',
    },
]

const CoursesPage = () => {
    const { data: user } = useSigninCheck()
    const navigate = useNavigate()
    const firestore = useFirestore()
    const coursesCollection = collection(firestore, COLLECTIONS.COURSES)

    const coursesQuery = user && user.signedIn
        ? query(coursesCollection, orderBy('startAt', 'desc'))
        : query(coursesCollection, orderBy('startAt', 'desc'), where('publish', '==', true))
    
    const { status, data } = useFirestoreCollectionData(coursesQuery, {
        idField: 'id',
    })

    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper courses">
                {
                    user && user.signedIn &&
                        <Button
                            type="primary"
                            style={{ marginLeft: 'auto', display: 'flex' }}
                            onClick={() => navigate('/courses/add')}
                        >
                            Agregar Curso
                        </Button>
                }
                {
                    data && data.length > 0
                        ? data.map((item) => (
                            <CourseCard
                                key={item.title}
                                item={item}
                                isAdmin={user && user.signedIn}
                            />
                        ))
                        : <Card loading={status === 'loading'}>No hay Cursos para mostrar</Card>
                }
            </div>
        </div>
    )
}

export default CoursesPage