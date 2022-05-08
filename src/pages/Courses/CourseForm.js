import React from 'react'
import { Button, Card, DatePicker, Form, Input, Row, Col, Switch } from 'antd'
import Separator from 'components/Separator'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import moment from 'moment'
import { textEditorOptions } from 'utils/constants'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import './Courses.css'

const validateContent = (hasContent) => {
    if (!hasContent) {
        return {
            validateStatus: 'error',
            errorMsg: 'El contenido es necesario para crear un curso'
        }
    }
    return {
        validateStatus: 'success',
        errorMsg: null,
    }
}

const CourseForm = ({ course, onSubmit, loading, goBack }) => {
    const [form] = Form.useForm()
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty() || {})
    const [contentStatus, setContentStatus] = React.useState({})

    React.useEffect(() => {
        if (course) {
            const { onHomeBanner, publish, title, startAt, facilitator, content, contactInfo } = course
            form.setFieldsValue({
                onHomeBanner,
                publish,
                title,
                startAt: moment(startAt),
                facilitator,
                content,
                whatsapp: contactInfo.whatsapp || false,
                facebook: contactInfo.facebook || false,
                instagram: contactInfo.instagram || false,
            })

            const contentBlock = htmlToDraft(content)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                const _editorState = EditorState.createWithContent(contentState)
                setEditorState(_editorState)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course])

    React.useEffect(() => {
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        form.setFieldsValue({ content })
        setContentStatus(validateContent(editorState.getCurrentContent().hasText()))
    }, [form, editorState])

    const handleOnSubmit = ({ onHomeBanner, publish, title, startAt, facilitator, content, whatsapp, instagram, facebook }) => {
        const data = {
            onHomeBanner: onHomeBanner || false,
            publish: publish || false,
            title,
            startAt: startAt.toString(),
            facilitator,
            content,
            contactInfo: {
                whatsapp: whatsapp || false,
                facebook: facebook || false,
                instagram: instagram || false,
            },
        }

        onSubmit(data)
    }

    return (
        <Card title={`${!!course ? 'Editar' : 'Crear'} curso`} className="course-form">
            <Form
                form={form}
                name="course-form"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                labelWrap={true}
                initialValues={{ remember: true }}
                layout="horizontal"
                onFinish={handleOnSubmit}
                autoComplete="off"
            >
                <Row>
                    <Col xs={24} md={12}>
                        <Form.Item
                            labelCol={{ span: 14 }}
                            wrapperCol={{ span: 10 }}
                            name="onHomeBanner"
                            label="¿Poner en el Banner de la pantalla principal?"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            labelCol={{ span: 14 }}
                            wrapperCol={{ span: 10 }}
                            name="publish"
                            label="Publicar (va a ser visible para todos)"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>
                
                <Separator />

                <Form.Item label="Título" name="title" rules={[{ required: true, message: 'Por favor, ingrese un título' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Facilitador" name="facilitator" rules={[{ required: true, message: 'Por favor, ingrese un facilitador' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Fecha de inicio" name="startAt">
                    <DatePicker placeholder='Fecha' />
                </Form.Item>

                <Form.Item label="Contenido" name="content" style={{ display: 'none' }}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Contenido"
                    validateStatus={contentStatus.validateStatus}
                    help={contentStatus.errorMsg}
                >
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={setEditorState}
                        toolbar={textEditorOptions}
                    />
                </Form.Item>

                <Separator />

                <div>¿Qué redes sociales de contacto agregar a la publicación del Curso?</div>
                <Row>
                    <Col xs={24} md={8}>
                        <Form.Item
                            labelCol={{ span: 14 }}
                            wrapperCol={{ span: 10 }}
                            name="whatsapp"
                            label="Whatsapp"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            labelCol={{ span: 14 }}
                            wrapperCol={{ span: 10 }}
                            name="facebook"
                            label="Facebook"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            labelCol={{ span: 14 }}
                            wrapperCol={{ span: 10 }}
                            name="instagram"
                            label="Instagram"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>

                <Separator />

                <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="blog-form-buttons">
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

export default CourseForm
