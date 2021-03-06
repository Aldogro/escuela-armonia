import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useFirestore, useFirestoreDocData} from 'reactfire'
import { setDoc, doc } from 'firebase/firestore'

import { ReadOutlined } from '@ant-design/icons'
import Breadcrumbs from 'components/Breadcrumbs'
import BlogForm from '../BlogForm'

import { COLLECTIONS } from 'utils/constants'
import { message } from 'antd'
import { routes } from 'routes/routes'


const EditBlogEntry = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)
    const breadcrumbs = [
        {
            route: routes.BLOG,
            icon: <ReadOutlined />,
            content: 'Blog'
        },
        {
            route: `${routes.BLOG}/${id || ''}/edit`,
            content: 'Editar nota'
        }
    ]
    const firestore = useFirestore()

    const ref = doc(firestore, COLLECTIONS.BLOG, id)
    const { data } = useFirestoreDocData(ref)

    const editBlogEntry = async (data) => {
        try {
            setLoading(true)
            await setDoc(ref, data)
            message.success('Entrada al Blog editada correctamente')
            navigate(routes.BLOG)
        } catch (error) {
            message.error('Hubo un problema al intentar editar la entrada al blog')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper">
                <BlogForm
                    blogEntry={data}
                    onSubmit={editBlogEntry}
                    loading={loading}
                    goBack={() => navigate(routes.BLOG)}
                />
            </div>
        </div>
    )
}

export default EditBlogEntry