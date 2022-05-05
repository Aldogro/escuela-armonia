import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useFirestore, useFirestoreDocDataOnce } from 'reactfire'
import { setDoc, doc } from 'firebase/firestore'

import { ReadOutlined } from '@ant-design/icons'
import Breadcrumbs from 'components/Breadcrumbs'
import BlogForm from '../BlogForm'

import { COLLECTIONS } from 'utils/constants'
import { message } from 'antd'


const EditBlogEntry = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)
    const breadcrumbs = [
        {
            route: '/blog',
            icon: <ReadOutlined />,
            content: 'Blog'
        },
        {
            route: `/blog/${id || ''}/edit`,
            content: 'Editar nota'
        }
    ]
    const firestore = useFirestore()

    const ref = doc(firestore, COLLECTIONS.BLOG, id)
    const { data } = useFirestoreDocDataOnce(ref)

    const editBlogEntry = async (data) => {
        try {
            setLoading(true)
            await setDoc(ref, data)
            message.success('Entrada al Blog editada correctamente')
            navigate('/blog')
        } catch (error) {
            console.log(error)
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
                    goBack={() => navigate('/blog')}
                />
            </div>
        </div>
    )
}

export default EditBlogEntry