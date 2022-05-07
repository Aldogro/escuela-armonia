import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <Result
            status="404"
            title="Error 404"
            subTitle="Esta página no existe"
            extra={
                <Button type="primary" onClick={() => navigate(-1)}>
                    Vamos a la página anterior
                </Button>
            }
        />
    )
}

export default Page404