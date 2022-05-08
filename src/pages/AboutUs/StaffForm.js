import React from 'react'
import {ref, uploadBytesResumable } from 'firebase/storage'
import { useStorage, useStorageTask } from 'reactfire'

import { Button, Card, Form, Input, message } from 'antd'
import './AboutUs.css'

const UploadProgress = ({ uploadTask, storageRef }) => {
    const { status, data: uploadProgress } = useStorageTask(uploadTask, storageRef)
  
    if (status === 'loading') {
      return 'Cargando...'
    }
  
    const { bytesTransferred, totalBytes } = uploadProgress
  
    const percentComplete = Math.round(100 * (bytesTransferred / totalBytes)) + '%'
    return <span>{percentComplete}</span>
}

const StaffForm = ({ staff, onSubmit, loading, goBack }) => {
    const storage = useStorage()

    const [uploadTask, setUploadTask] = React.useState(undefined)
    const [imageRef, setRef] = React.useState(undefined)
    const [form] = Form.useForm()

    React.useEffect(() => {
        if (staff) {
            const { name, description, avatar } = staff
            form.setFieldsValue({
                name,
                description,
                avatar,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staff])

    const handleOnSubmit = ({ name, description, avatar }) => {
        const data = {
            name,
            description,
            avatar,
        }

        onSubmit(data)
    }

    const normFile = async (e) => {
        const fileList = e.target.files
        const fileToUpload = fileList[0]
        const fileName = fileToUpload.name
        const newRef = ref(storage, `images/staff/${fileName}`)
        form.setFieldsValue({
            avatar: `images/staff/${fileName}`
        })

        setRef(newRef)

        const uploadTask = uploadBytesResumable(newRef, fileToUpload)

        uploadTask.then(() => {
            message.success('La imagen se subió correctamente')
            setUploadTask(undefined)
        })
        setUploadTask(uploadTask)
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
                <Form.Item
                    name="avatar"
                    label="Avatar"
                >
                    <Input disabled />
                </Form.Item>
                {uploadTask ? <UploadProgress uploadTask={uploadTask} storageRef={imageRef} /> : 'Agrega un archivo para visualizar el progreso de descarga'}
                <input type="file" accept="image/png, image/jpeg" onChange={normFile} />

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