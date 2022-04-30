import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from 'routes/routes'

import { Drawer } from 'antd'
import {
  BulbOutlined,
  HomeOutlined,
  TeamOutlined,
  ReadOutlined,
  LockOutlined,
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
  {
    title: 'Admin',
    icon: <LockOutlined />,
    route: routes.ADMIN,
  }
]

const CustomDrawer = ({ collapsed, toggleCollapsed}) => {
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
      width="100%"
      >
        {menuItems.map(menuItem => (
          <Link to={menuItem.route} key={menuItem.title} onClick={toggleCollapsed}>
            <div className="menu-item">
              {menuItem.icon}
              {menuItem.title}
            </div>
          </Link>
        ))}
        <div className="social-media">
          <FacebookContact />
          <InstagramContact />
          <WhatsappContact />
        </div>
      </Drawer>
  )
}

export default CustomDrawer
