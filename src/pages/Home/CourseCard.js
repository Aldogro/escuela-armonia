import React from 'react'
import { WhatsappContact, InstagramContact, FacebookContact } from 'components/SocialMediaContacts'
import format from 'date-fns/format'
import './CourseCard.css'

const CourseCard = ({ title, startAt, facilitator, contactInfo, content }) => {
    return (
        <div className="course-card-wrapper">
            <div className="course-text">
                <div className="header">Próximos Cursos</div>
                <div className="title">{title}</div>
                <div className="date">
                    {startAt
                        ? `Comienza: ${format(startAt, 'dd/MM/yyyy')}`
                        : 'Próximamente'
                    }
                </div>
                <div className="content">{content}</div>
                <p className="facilitator">{facilitator}</p>
            </div>
            <div className="course-contact-info">
                {contactInfo.whatsapp && <WhatsappContact />}
                {contactInfo.instagram && <InstagramContact />}
                {contactInfo.facebook && <FacebookContact />}
            </div>
        </div>
    )
}

export default CourseCard