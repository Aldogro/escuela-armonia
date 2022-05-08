import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, message, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import { useFirestore } from 'reactfire'
import { deleteDoc, doc } from 'firebase/firestore'

import { COLLECTIONS } from 'utils/constants'
import format from 'date-fns/format'
import './BlogEntryCard.css'
import { routes } from 'routes/routes'

const BlogEntryCard = ({ item, isAdmin }) => {
    const [loading, setLoading] = React.useState(false) 
    const navigate = useNavigate()

    const editBlogEntry = () => {
        navigate(`${routes.BLOG}/${item.id}/edit`)
    }
    const firestore = useFirestore()
    const ref = doc(firestore, COLLECTIONS.BLOG, item.id)

    const deleteBlogEntry = () => {
        try {
            setLoading(true)
            deleteDoc(ref)
            message.success('Entrada de blog eliminada con éxito')
        } catch (error) {
            message.error('Hubo un error al intentar eliminar la entrada de blog')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card
            className="blog-card"
            title={
                <div>
                    <div className="blog-title">
                        {item.title}
                    </div>
                    <div className="blog-author">
                        <i>Por Beatriz Carlotto Sarjanovich</i>
                    </div>
                    <div className="blog-date">
                        {format(new Date(item.date), 'dd/MM/yyyy')}
                    </div>
                </div>
            }
            actions={
                isAdmin &&
                [
                    item.publish
                        ? <EyeOutlined key="view" className="blog-action--publish" />
                        : <EyeInvisibleOutlined key="unpublished" className="blog-action--publish" />,
                    <EditOutlined
                        key="edit"
                        className="blog-action"
                        onClick={editBlogEntry}
                    />,
                    <Popconfirm
                        title="¿Borrar entrada del blog?"
                        cancelText="Cancelar"
                        okText="Borrar"
                        onConfirm={deleteBlogEntry}
                        okButtonProps={{ loading }}
                    >
                        <DeleteOutlined key="delete" className="blog-action blog-action--delete" />
                    </Popconfirm>
                ]
            }
        >
            <div className="blog-content" dangerouslySetInnerHTML={{__html: item.content}} />
        </Card>
    )
}

export default BlogEntryCard