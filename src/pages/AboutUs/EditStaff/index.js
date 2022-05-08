import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useFirestore, useFirestoreDocData} from 'reactfire'
import { setDoc, doc } from 'firebase/firestore'

import { ReadOutlined } from '@ant-design/icons'
import Breadcrumbs from 'components/Breadcrumbs'
import StaffForm from '../StaffForm'

import { COLLECTIONS } from 'utils/constants'
import { message } from 'antd'
import { routes } from 'routes/routes'

const EditStaff = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)
    const breadcrumbs = [
        {
            route: routes.ABOUT_US,
            icon: <ReadOutlined />,
            content: 'Nosotras'
        },
        {
            route: `${routes.ABOUT_US}/${id || ''}/edit`,
            content: 'Editar Staff'
        }
    ]
    const firestore = useFirestore()

    const ref = doc(firestore, COLLECTIONS.STAFF, id)
    const { data } = useFirestoreDocData(ref)

    const editStaff = async (data) => {
        try {
            setLoading(true)
            await setDoc(ref, data)
            message.success('Staff editado correctamente')
            navigate(routes.ABOUT_US)
        } catch (error) {
            message.error('Hubo un problema al intentar editar el Staff')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="layout-content--wrapper">
                <StaffForm
                    staff={data}
                    onSubmit={editStaff}
                    loading={loading}
                    goBack={() => navigate(routes.ABOUT_US)}
                />
            </div>
        </div>
    )
}

export default EditStaff