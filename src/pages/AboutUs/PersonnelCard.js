import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useFirestore } from 'reactfire'
import { deleteDoc, doc } from 'firebase/firestore'

import { Card, Avatar, Popconfirm, message } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import { routes } from 'routes/routes'
import { COLLECTIONS } from 'utils/constants'

import './AboutUs.css'

const { Meta } = Card

const PersonnelCard = ({ item, isAdmin = false }) => {
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    const editStaff = () => {
        navigate(`${routes.ABOUT_US}/${item.id}/edit`)
    }

    const firestore = useFirestore()
    const ref = doc(firestore, COLLECTIONS.STAFF, item.id)
    console.log(ref)

    const deleteStaff = () => {
        try {
            setLoading(true)
            deleteDoc(ref)
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
                avatar={<Avatar size={100} src={item.picture} />}
                title={item.name}
                description={<div>{item.description}</div>}
            />
        </Card>
    )
}

export default PersonnelCard