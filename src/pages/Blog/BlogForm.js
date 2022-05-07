import React from 'react'
import { Button, Card, Form, Input, Switch } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { textEditorOptions } from 'utils/constants'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './Blog.css'

const validateContent = (hasContent) => {
    if (!hasContent) {
        return {
            validateStatus: 'error',
            errorMsg: 'El contenido es necesario para crear una entrada de blog',
        }
    }
    return {
        validateStatus: 'success',
        errorMsg: null,
    }
}

const BlogForm = ({ blogEntry, onSubmit, loading, goBack }) => {
    const [form] = Form.useForm() 
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty() || {})
    const [contentStatus, setContentStatus] = React.useState({})

    React.useEffect(() => {
        if (blogEntry) {
            const { publish, title, content } = blogEntry
            form.setFieldsValue({
                publish,
                title,
                content,
            })

            const contentBlock = htmlToDraft(content)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                const _editorState = EditorState.createWithContent(contentState)
                setEditorState(_editorState)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogEntry])

    React.useEffect(() => {
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        form.setFieldsValue({ content })
        setContentStatus(validateContent(editorState.getCurrentContent().hasText()))
    }, [editorState, form])

    const handleOnSubmit = ({ title, content, publish }) => {
        const data = {
            title,
            content,
            publish: publish || false,
            date: new Date().toString()
        }

        onSubmit(data)
    }

    return (
        <Card title={`${!!blogEntry ? 'Editar' : 'Crear'} entrada en el blog`} className="blog-form">
            <Form
                form={form}
                name="blog-entry"
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={handleOnSubmit}
                autoComplete="off"
            >
                <Form.Item name="publish" label="Publicar" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="Título"
                    name="title"
                    rules={[{ required: true, message: 'Por favor, ingrese un título' }]}
                >
                    <Input />
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

export default BlogForm