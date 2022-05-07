import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { ReactComponent as Logo} from 'assets/images/logo.svg'

import './LoadingFallback.css'

const LoadingFallback = () => {
    return (
        <div className="loading-fallback-container">
            <LoadingOutlined className="loading-fallback-spinner" />
            <Logo className="loading-fallback-img" />
        </div>
    )
}

export default LoadingFallback