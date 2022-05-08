import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirestore, useFirestoreCollectionData, useSigninCheck } from 'reactfire'
import { collection, query, orderBy } from 'firebase/firestore'

import Breadcrumbs from 'components/Breadcrumbs'
import PersonnelCard from './PersonnelCard'

import { Button, Row, Col } from 'antd'
import { TeamOutlined } from '@ant-design/icons'
import './AboutUs.css'

import beatriz  from 'assets/images/about/beatriz-carlotto.jpeg'
import { routes } from 'routes/routes'
import { COLLECTIONS } from 'utils/constants'

const director = {
    id: '1',
    name: 'Beatriz Carlotto Sarjanovich',
    description: (<div>
        <p>Maestra de Reiki en varios Sistemas, Numeróloga, Facilitadora de la Técnica Hawaiana Ho´oponopono, de Geometría Sagrada, de Visualización Creativa y otras Terapias Complementarias.</p>
        <b style={{ marginBottom: 0 }}>Directora</b>
    </div>),
    picture: beatriz,
}

const breadcrumbs = [
    {
        route: routes.ABOUT_US,
        icon: <TeamOutlined />,
        content: 'Nosotras'
    },
]

const AboutUs = () => {
    const { data: user } = useSigninCheck()
    const navigate = useNavigate()

    const firestore = useFirestore()
    const staffCollection = collection(firestore, COLLECTIONS.STAFF)
    const staffQuery = query(staffCollection, orderBy('name', 'desc'))

    const { status, data } = useFirestoreCollectionData(staffQuery, {
        idField: 'id',
    })

    console.log(data)

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
                    {
                        user && user.signedIn &&
                        <Button
                            type="primary"
                            style={{ marginLeft: 'auto', display: 'flex' }}
                            onClick={() => navigate(routes.ADD_STAFF)}
                        >
                            Agregar Staff
                        </Button>
                    }
                    </div>
                    <Col key={director.name}>
                        <PersonnelCard item={director} isAdmin={false} />
                    </Col>
                    {data && data.map((item) => (
                        <Col xs={24} md={12} key={item.name}>
                            <PersonnelCard item={item} isAdmin={user && user.signedIn} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default AboutUs