import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ user, children }: { user: boolean, children: JSX.Element }): React.ReactElement => {
    if (!user) {
      return <Navigate to="/" replace />
    }
  
    return children
}

export default ProtectedRoute