import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { message } from 'antd'
import { useAuth, useSigninCheck } from 'reactfire'
import { signInWithEmailAndPassword } from 'firebase/auth'

import LoginForm from './LoginForm'

const onSignIn = async (auth, email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    message.error('Hubo un error al intentar ingresar')
  }
}

const LoginPage = () => {
  const auth = useAuth();
  const { data } = useSigninCheck();
  let navigate = useNavigate();

  const successfullyLoggedIn = () => {
    navigate('/')
    message.success('¡Ingresaste correctamente!')
  }
  useEffect(() => {
    data && data.signedIn && successfullyLoggedIn()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="layout-content--wrapper">
      <LoginForm onSubmit={onSignIn} auth={auth} />
    </div>
  )
}

export default LoginPage