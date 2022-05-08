import React from 'react'
import { Button, Card, Form, Input } from 'antd'
import './AboutUs.css'

const StaffForm = ({ staff, onSubmit, loading, goBack }) => {
    const [form] = Form.useForm() 

    React.useEffect(() => {
        if (staff) {
            const { name, description } = staff
            form.setFieldsValue({
                name,
                description,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staff])

    const handleOnSubmit = ({ name, description }) => {
        const data = {
            name,
            description,
        }

        onSubmit(data)
    }

    return (
        <Card title={`${!!staff ? 'Editar' : 'Crear'} Staff`} className="staff-form">
            <Form
                form={form}
                name="staff"
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={handleOnSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Por favor, ingrese un nombre' }]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item
                    label="Descripción"
                    name="description"
                    rules={[{ required: true, message: 'Por favor, ingrese un nombre' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item className="blog-form-buttons">
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

export default StaffForm