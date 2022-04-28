import React from 'react'
import './CourseCard.css';
import { FacebookFilled, InstagramFilled, WhatsAppOutlined } from '@ant-design/icons'

const CourseCard = () => {
    return (
        <div className="course-card-wrapper">
            <div className="course-text">
                <div className="header">Próximos Cursos</div>
                <div className="title">Numerologia, Geometria Sagrada y Mandalas</div>
                <div className="date">{new Date().toDateString()}</div>
                <div className="description">lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum</div>
                <p className="facilitator">Beatriz Carlotto</p>
            </div>
            <div className="course-contact-info">
                <WhatsAppOutlined />
                <FacebookFilled />
                <InstagramFilled />
            </div>
        </div>
    )
}

export default CourseCard