import React from 'react'

import { Card, Carousel } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import CarouselSlide from './CarouselSlide'
import CourseCard from './CourseCard'
import Breadcrumbs from 'components/Breadcrumbs'
import { therapies } from './therapies'
import { courses } from './courses' 
import './Home.css'

const { Meta } = Card;

const breadcrumbs = [
    {
        route: '/',
        icon: <HomeOutlined />,
        content: 'Inicio',
    }
]

const Home = () => {
    return (
        <div>
            <div className="home-banner"/>
            <Carousel>
                {courses.map(({ title, startAt, facilitator, contactInfo, description }) => (
                    <CarouselSlide key={title}>
                        <CourseCard
                            title={title}
                            startAt={startAt}
                            facilitator={facilitator}
                            contactInfo={contactInfo}
                            description={description}
                        />
                    </CarouselSlide>    
                ))}
            </Carousel>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper">
                <h2 className="home-title">¿Qué son las terapias complementarias?</h2>
                <div className="home-text">
                    <p>Las terapias Complementarias en los últimos años se están usando junto a la
                        Medicina Convencional.
                        El fin de las mismas es mejorar la salud y promover una mejor calidad de vida
                        de las personas.
                    </p>
                    <p>
                        Junto a la Medicina Convencional pueden ser un coadyuvante para mitigar problemas
                        físicos y emocionales de distintas enfermedades.
                    </p>
                    <p>
                        Sin embargo, es importante aclarar que la <b>Medicina Convencional debería ser siempre
                        la primera opción</b> al momento de tratar una enfermedad.
                    </p>
                    <p>
                        También es importante aclarar que las Terapias Complementarias son diferentes de la
                        Medicina Alternativa. Estas últimas proponen sustituir la medicina convencional,
                        mientras que las Terapias Complementarias como su palabra lo dice, se usan para
                        “complementar tratamientos médicos”.
                    </p>
                    <p>
                        Para aplicar las Terapias Complementarias de manera adecuada, es primordial elegir un
                        Terapeuta Certificado y con experiencia.
                    </p>
                </div>
                <h3 className="home-title">Algunas de las Terapias Complementarias que se dictan en nuestra Escuela</h3>
                <div className="home-text">
                    {therapies.map((therapy) => (
                        <Card key={therapy.title}>
                            <Meta
                                avatar={<img src={therapy.image} alt={therapy.title} height="50" />}
                                title={therapy.title}
                                description={therapy.description}
                            />
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home
