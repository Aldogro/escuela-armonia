import React from 'react'
import { Card } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'

import format from 'date-fns/format'
import './BlogEntryCard.css'

const BlogEntryCard = ({ item, isAdmin }) => {
    return (
        <Card
            className="blog-card"
            title={
                <div>
                    <div className="blog-title">
                        {item.title}
                    </div>
                    <div className="blog-author">
                        <i>Por Beatriz Carlotto Sarjanovich</i>
                    </div>
                    <div className="blog-date">
                        {format(new Date(item.date), 'dd/MM/yyyy')}
                    </div>
                </div>
            }
            actions={
                isAdmin &&
                [
                    <EyeOutlined key="view" className="blog-action" />,
                    <EditOutlined key="edit" className="blog-action" />,
                    <DeleteOutlined key="delete" className="blog-action blog-action--delete" />,
                ]
            }
        >
            <div className="blog-content">{item.content}</div>
        </Card>
    )
}

export default BlogEntryCard