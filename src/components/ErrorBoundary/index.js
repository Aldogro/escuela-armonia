import React from 'react'
import { Result } from 'antd';
import { ErrorBoundary } from 'react-error-boundary'
import './ErrorBoundary.css'

const FallbackComponent = ({error, resetErrorBoundary}) => {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Algo no anda bien..."
            extra={
                <div onClick={resetErrorBoundary}>
                    <div className="error-button">
                        Recuperarse del error
                    </div>
                </div>
            }
        />
    )
}

const CustomErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={FallbackComponent}>
            {children}
        </ErrorBoundary>
    )
}

export default CustomErrorBoundary
