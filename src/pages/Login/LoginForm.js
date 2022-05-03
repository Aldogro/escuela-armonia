import React from 'react'
import { Button, Card, Form, Input } from 'antd'

import './LoginForm.css'

const LoginForm = ({ onSubmit }) => {
  const handleOnSubmit = ({ email, password }) => {
    onSubmit(email, password)
  }

  return (
    <Card title="Login para administradores" className="login-form">
      <Form
        name="login"
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleOnSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Por favor, ingrese su email en un formato correcto', type: 'email' }]}
        >
          <Input />
        </Form.Item>
      
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]}
        >
          <Input.Password />
        </Form.Item>
      
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )  
}

export default LoginForm