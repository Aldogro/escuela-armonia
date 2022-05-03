import React from 'react'
import { Button, Card, Form, Input } from 'antd'
import './Blog.css'

const BlogForm = ({ onSubmit, loading, goBack }) => {
    const handleOnSubmit = ({ title, content }) => {
        const data = {
            title,
            content,
            date: new Date().toString()
        }
        onSubmit(data)
    }

    return (
        <Card title="Crear entrada en el blog" className="blog-form">
            <Form
                name="blog-entry"
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={handleOnSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Título"
                    name="title"
                    rules={[{ required: true, message: 'Por favor, ingrese un título' }]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item
                    label="Contenido"
                    name="content"
                    rules={[{ required: true, message: 'Por favor, ingrese un contenido para el blog' }]}
                >
                    <Input.TextArea />
                </Form.Item>
            
                <Form.Item>
                    <Button onClick={goBack}>
                        Volver
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default BlogForm