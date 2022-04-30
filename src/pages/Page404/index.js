import React from 'react'
import { Link } from 'react-router-dom'
import { Result } from 'antd'

const Page404 = () => {
    return (
        <Result
            status="404"
            title="Error 404"
            subTitle="Esta página no existe"
            extra={
                <Link to="/">Vamos a la página de inicio</Link>
            }
        />
    )
}

export default Page404