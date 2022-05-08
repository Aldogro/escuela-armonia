import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirestore } from 'reactfire'
import { collection, addDoc } from 'firebase/firestore'
import { message } from 'antd'
import { GroupOutlined } from '@ant-design/icons'
import { routes } from 'routes/routes'
import { COLLECTIONS } from 'utils/constants'
import Breadcrumbs from 'components/Breadcrumbs'
import StaffForm from '../StaffForm'

const breadcrumbs = [
    {
        route: routes.ABOUT_US,
        icon: <GroupOutlined />,
        content: 'Nosotras'
    },
    {
        route: routes.ADD_STAFF,
        content: 'Agregar Staff'
    }
]

const AddStaff = () => {
    const navigate = useNavigate()
    const firestore = useFirestore()
    const blogCollection = collection(firestore, COLLECTIONS.STAFF)
    
    const [loading, setLoading] = React.useState(false)
    
    const addStaff = async (data) => {
        try {
            setLoading(true)
            await addDoc(blogCollection, data)
            message.success('Staff agregado correctamente')
            navigate(routes.ABOUT_US)
        } catch (error) {
            message.error('Hubo un problema al intentar agreagar el Staff')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper">
                <StaffForm
                    onSubmit={addStaff}
                    loading={loading}
                    goBack={() => navigate(routes.ABOUT_US)}
                />
            </div>
        </div>
    )
}

export default AddStaff