import React from 'react'
import { WhatsAppOutlined, InstagramFilled, FacebookFilled } from '@ant-design/icons'

export const WhatsappContact = () => {
    return (
        <a href="https://api.whatsapp.com/send?phone=+5492477538225&text=¡Hola!%0AMi nombre es" target="_blank" rel="noopener noreferrer">
            <WhatsAppOutlined />
        </a>
    )
}

export const InstagramContact = () => {
    return (
        <a href="https://www.instagram.com/beatrizcarlotto2018/" target="_blank" rel="noopener noreferrer">
            <InstagramFilled />
        </a>
    )
}

export const FacebookContact = () => {
    return (
        <a href="https://www.facebook.com/beatrizcarlotto" target="_blank" rel="noopener noreferrer">
            <FacebookFilled />
        </a>
    )
}
