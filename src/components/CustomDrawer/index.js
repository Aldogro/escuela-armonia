import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from 'routes/routes'

import { useAuth, useSigninCheck } from 'reactfire'

import { Drawer, message } from 'antd'
import {
  BulbOutlined,
  HomeOutlined,
  TeamOutlined,
  ReadOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { FacebookContact, InstagramContact, WhatsappContact } from 'components/SocialMediaContacts'
import logoHorizontal from 'assets/images/logo-horizontal.svg'

import './CustomDrawer.css'

const menuItems = [
  {
    title: 'Inicio',
    icon: <HomeOutlined />,
    route: routes.HOME,
  },
  {
    title: 'Cursos',
    icon: <BulbOutlined />,
    route: routes.CURSOS,
  },
  {
    title: 'Blog',
    icon: <ReadOutlined />,
    route: routes.BLOG,
  },
  {
    title: 'Nosotras',
    icon: <TeamOutlined />,
    route: routes.ABOUT_US,
  },
]

const signOut = async (auth) => {
  try {
    await auth.signOut()
    message.success('¡Saliste correctamente!')
  } catch (error) {
    message.error('Hubo un error al intentar salir')
  }
};

const CustomDrawer = ({ collapsed, toggleCollapsed}) => {
  const auth = useAuth();
  const { data } = useSigninCheck();
  return (
    <Drawer
      title={
        <div className="logo">
          <img
            src={logoHorizontal}
            height="65px"
            alt="logo"
          />
        </div>
      }
      placement="left"
      onClose={toggleCollapsed}
      visible={collapsed}
      >
        {menuItems.map(menuItem => (
          <Link to={menuItem.route} key={menuItem.title} onClick={toggleCollapsed}>
            <div className="menu-item">
              {menuItem.icon}
              {menuItem.title}
            </div>
          </Link>
        ))}

        {data && data.signedIn
          ?
          <div className="menu-item" onClick={() => {
              signOut(auth)
              toggleCollapsed()
            }}>
            <LogoutOutlined />
            Salir
          </div>
          : 
          <Link to={routes.ADMIN} onClick={toggleCollapsed}>
            <div className="menu-item">
              <LoginOutlined />
              Admin
            </div>
          </Link>
        }
        <div className="social-media">
          <FacebookContact />
          <InstagramContact />
          <WhatsappContact />
        </div>
      </Drawer>
  )
}

export default CustomDrawer
