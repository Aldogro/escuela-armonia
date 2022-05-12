import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, message, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import Separator from 'components/Separator'
import { WhatsappContact, InstagramContact, FacebookContact } from 'components/SocialMediaContacts'

import format from 'date-fns/format'

import { useFirestore } from 'reactfire'
import { deleteDoc, doc } from 'firebase/firestore'

import { COLLECTIONS } from 'utils/constants'

import './CourseCard.css'

const CourseCard = ({ item, isAdmin }) => {
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    const editCourse = () => {
        navigate(`/courses/${item.id}/edit`)
    }

    const firestore = useFirestore()
    const ref = doc(firestore, COLLECTIONS.COURSES, item.id)

    const deleteCourse = () => {
        try {
            setLoading(true)
            deleteDoc(ref)
            message.success('Curso borrado correctamenete')
        } catch (error) {
            message.error('Hubo un error al intentar eliminar el Curso')
        } finally {
            setLoading(false)
        }
    }
    return (
        <Card
            title={item.title}
            className={ isAdmin ? 'additional-padding-bottom' : '' }
            actions={
                isAdmin &&
                [
                    item.publish
                        ? <EyeOutlined key="view" className="course-action--publish" />
                        : <EyeInvisibleOutlined key="unpublished" className="course-action--publish" />,
                    <EditOutlined
                        key="edit"
                        className="course-action"
                        onClick={editCourse}
                    />,
                    <Popconfirm
                        title="¿Borrar Curso?"
                        cancelText="Cancelar"
                        okText="Borrar"
                        onConfirm={deleteCourse}
                        okButtonProps={{ loading }}
                    >
                        <DeleteOutlined key="delete" className="course-action course-action--delete" />
                    </Popconfirm>
                ]
            }
        >
            <div>Fecha de inicio: <b className="courses-card-date">{format(new Date(item.startAt), 'dd-MM-yyyy')}</b></div>
            <div className="courses-card-facilitator">Facilitadora: <b>{item.facilitator}</b></div>
            <Separator />
            <div className="courses-card-content" dangerouslySetInnerHTML={{ __html: item.content }}/>
            <Separator />
            <div>Contactanos para obtener más información a través de:</div>
            <div className="courses-contact-info">
                {item.contactInfo.whatsapp && <WhatsappContact />}
                {item.contactInfo.instagram && <InstagramContact />}
                {item.contactInfo.facebook && <FacebookContact />}
            </div>
        </Card>
    )
}

export default CourseCard