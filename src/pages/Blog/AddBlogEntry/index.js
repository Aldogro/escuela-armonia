import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogForm from '../BlogForm'

import { useFirestore } from 'reactfire'
import { collection, addDoc } from 'firebase/firestore'
import { message } from 'antd'

import { ReadOutlined } from '@ant-design/icons'
import Breadcrumbs from 'components/Breadcrumbs'
import { COLLECTIONS } from 'utils/constants'

const breadcrumbs = [
    {
        route: '/blog',
        icon: <ReadOutlined />,
        content: 'Blog'
    },
    {
        route: '/blog/add',
        content: 'Agregar nota'
    }
]

const AddBlogEntry = () => {
    const navigate = useNavigate()
    const firestore = useFirestore()
    const blogCollection = collection(firestore, COLLECTIONS.BLOG)
    
    const [loading, setLoading] = React.useState(false)
    
    const addBlogEntry = async (data) => {
        try {
            setLoading(true)
            await addDoc(blogCollection, data)
            message.success('Entrada al Blog agregada correctamente')
            navigate('/blog')
        } catch (error) {
            message.error('Hubo un problema al intentar agreagar la entrada al blog')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper">
                <BlogForm onSubmit={addBlogEntry} loading={loading} goBack={() => navigate('/blog')}/>
            </div>
        </div>
    )
}

export default AddBlogEntry