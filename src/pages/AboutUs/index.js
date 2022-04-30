import React from 'react'
import Breadcrumbs from 'components/Breadcrumbs'
import PersonnelCard from './PersonnelCard'

import { Row, Col } from 'antd'
import { TeamOutlined } from '@ant-design/icons'
import './AboutUs.css'

import beatriz  from 'assets/images/about/beatriz-carlotto.jpeg'
import adriana from 'assets/images/about/adriana-yepez.jpeg'
import andrea from 'assets/images/about/andrea-gimenez.jpeg'
import daniela from 'assets/images/about/daniela-pirchi.jpg'

const personnel = [
    {
        name: 'Beatriz Carlotto Sarjanovich',
        description: (<div>
            <p>Maestra de Reiki en varios Sistemas, Numeróloga, Facilitadora de la Técnica Hawaiana Ho´oponopono, de Geometría Sagrada, de Visualización Creativa y otras Terapias Complementarias.</p>
            <b style={{ marginBottom: 0 }}>Directora</b>
        </div>),
        picture: beatriz,
    },
    {
        name: 'Adriana Yepez',
        picture: adriana,
        description: (
            <div>
                <p style={{ marginBottom: 0 }}>Reiki Master, Astróloga, Reiki y Astrología para la Salud, Sesiones de Reiki Usui con integración de la Carta Astral.</p>
            </div>
        ),
    },
    {
        name: 'Andrea Giménez',
        picture: andrea,
        description: (
            <div>
                <p style={{ marginBottom: 0 }}>Reiki Usui, Reiki Karuna, Reiki Mariel, Numerología, Oráculos terapéuticos.</p>
            </div>
        ),
    },
    {
        name: 'Daniela Pirchi',
        picture: daniela,
        description: (
            <div>
                <p style={{ marginBottom: 0 }}>Maestra Personal de Reiki, Masajista.</p>
            </div>
        ),
    },
]

const breadcrumbs = [
    {
        route: '/about-us',
        icon: <TeamOutlined />,
        content: 'Nosotras'
    },
]

const AboutUs = () => {
    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper">
                <Row className="about-us--container" gutter={[20, 20]}>
                    <div>
                        <p>La finalidad de esta Escuela es orientar a quienes deseen ingresar en este Mundo Holístico, hacia las personas que les ofrezcan sus saberes si desean aprender, y además puedan contar con una Terapia segura y eficiente si sólo desean Sesiones.</p>
                        <p>Cada una de las personas que figuran en esta página son alumnas de la Escuela.</p>
                        <p>Gracias por su elección.</p>
                        <p>Con Amor.</p>
                        <p style={{ marginBottom: 0 }}><b>Beatriz Carlotto Sarjanovich</b></p>
                        <p><b>Directora</b></p>
                    </div>
                    {personnel.map(({ name, description, picture }) => (
                        <Col xs={24} md={12} key={name}>
                            <PersonnelCard name={name} description={description} picture={picture} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default AboutUs