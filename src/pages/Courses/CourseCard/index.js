import React from 'react'
import { Card } from 'antd'
import Separator from 'components/Separator'
import { WhatsappContact, InstagramContact, FacebookContact } from 'components/SocialMediaContacts'
import format from 'date-fns/format'

const CourseCard = ({ title, startAt, facilitator, content, contactInfo }) => {
    return (
        <Card title={title}>
            <div>Fecha de inicio: <b className="courses-card-date">{format(new Date(startAt), 'dd-MM-yyyy')}</b></div>
            <div className="courses-card-facilitator">Facilitadora: <b>{facilitator}</b></div>
            <Separator />
            <div className="courses-card-content" dangerouslySetInnerHTML={{ __html: content }}/>
            <Separator />
            <div>Contactanos para obtener más información a través de:</div>
            <div className="courses-contact-info">
                {contactInfo.whatsapp && <WhatsappContact />}
                {contactInfo.instagram && <InstagramContact />}
                {contactInfo.facebook && <FacebookContact />}
            </div>
        </Card>
    )
}

export default CourseCard