import React from 'react'
import './CourseCard.css';
import { WhatsappContact, InstagramContact, FacebookContact } from 'components/SocialMediaContacts';

const CourseCard = ({ title, startAt, facilitator, contactInfo, description }) => {
    return (
        <div className="course-card-wrapper">
            <div className="course-text">
                <div className="header">Próximos Cursos</div>
                <div className="title">{title}</div>
                <div className="date">
                    {startAt
                        ? `Comienza: ${startAt.toLocaleDateString()}`
                        : 'Próximamente'
                    }
                </div>
                <div className="description">{description}</div>
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