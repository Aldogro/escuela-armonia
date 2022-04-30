import React from 'react'
import { Card, Avatar } from 'antd'
import './AboutUs.css'

const { Meta } = Card;

const PersonnelCard = ({ name, description, picture }) => {
    return (
        <Card>
            <Meta
                avatar={<Avatar size={100} src={picture} />}
                title={name}
                description={<div>{description}</div>}
            />
        </Card>
    )
}

export default PersonnelCard