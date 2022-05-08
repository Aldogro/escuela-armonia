import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useFirestore, useStorage } from 'reactfire'
import { deleteDoc, doc } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'

import { Card, Avatar, Popconfirm, message } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, EyeInvisibleOutlined, TeamOutlined } from '@ant-design/icons'

import { routes } from 'routes/routes'
import { COLLECTIONS } from 'utils/constants'

import './AboutUs.css'

const { Meta } = Card

const PersonnelCard = ({ item, isAdmin = false }) => {
    const storage = useStorage()
    const [loading, setLoading] = React.useState(false)
    const [imageUrl, setImageUrl] = React.useState('')
    const navigate = useNavigate()

    if (item.avatar) {
        getDownloadURL(ref(storage, item.avatar)).then(url => setImageUrl(url))
    }

    const editStaff = () => {
        navigate(`${routes.ABOUT_US}/${item.id}/edit`)
    }

    const firestore = useFirestore()
    const docRef = doc(firestore, COLLECTIONS.STAFF, item.id)

    const deleteStaff = () => {
        try {
            setLoading(true)
            deleteDoc(docRef)
            message.success('Staff borrado correctamenete')
        } catch (error) {
            message.error('Hubo un error al intentar eliminar el Staff')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card
            actions={
                isAdmin &&
                [
                    item.publish
                        ? <EyeOutlined key="view" className="staff-action--publish" />
                        : <EyeInvisibleOutlined key="unpublished" className="staff-action--publish" />,
                    <EditOutlined
                        key="edit"
                        className="staff-action"
                        onClick={editStaff}
                    />,
                    <Popconfirm
                        title="¿Borrar Staff?"
                        cancelText="Cancelar"
                        okText="Borrar"
                        onConfirm={deleteStaff}
                        okButtonProps={{ loading }}
                    >
                        <DeleteOutlined key="delete" className="staff-action staff-action--delete" />
                    </Popconfirm>
                ]
            }
        >
            <Meta
                avatar={<Avatar icon={<TeamOutlined />} size={100} src={imageUrl} />}
                title={item.name}
                description={<div>{item.description}</div>}
            />
        </Card>
    )
}

export default PersonnelCard