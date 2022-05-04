import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useFirestore, useFirestoreCollectionData, useSigninCheck } from 'reactfire'
import { collection, query, orderBy } from 'firebase/firestore'

import { Button, Card } from 'antd'
import { ReadOutlined } from '@ant-design/icons'
import Breadcrumbs from 'components/Breadcrumbs'
import BlogEntryCard from './BlogEntryCard'
import './Blog.css'

const breadcrumbs = [
    {
        route: '/blog',
        icon: <ReadOutlined />,
        content: 'Blog'
    }
]

const BlogPage = () => {
    const { data: user } = useSigninCheck();
    const navigate = useNavigate()
    const firestore = useFirestore()
    const blogCollection = collection(firestore, 'blog')

    const blogQuery = query(blogCollection, orderBy('date', 'desc'));
    const { status, data } = useFirestoreCollectionData(blogQuery, {
        idField: 'id',
    });

    // const ref = doc(firestore, 'animals', 'BstAq5kCb0L5WYCeiLk6');
    // const p = useFirestoreDocDataOnce(ref)

    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper">
                {user && user.signedIn &&
                <Button
                    type="primary"
                    style={{ marginLeft: 'auto', display: 'flex' }}
                    onClick={() => navigate('/blog/add')}
                >
                    Agregar nota
                </Button>}
                {data && data.length > 0 ?
                    data.map(item => (
                        <BlogEntryCard item={item} isAdmin={user && user.signedIn} key={item.id} />
                    ))
                    : <Card loading={status === 'loading'} />
                }
            </div>
        </div>
    )
}

export default BlogPage