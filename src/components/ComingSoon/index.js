import React from 'react'
import { Result } from 'antd'
import './ComingSoon.css'

const ComingSoon = ({ title = 'Este sitio' }) => {
    return (
        <Result
            status="404"
            title={`${title} aún está en construcción`}
        />
    )
}

export default ComingSoon
