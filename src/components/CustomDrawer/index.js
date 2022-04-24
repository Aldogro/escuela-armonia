import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from 'routes/routes'

import { Drawer } from 'antd'
import {
  BulbOutlined,
  HomeOutlined,
  PhoneOutlined,
  ReadOutlined,
  UserOutlined
} from '@ant-design/icons'

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
    title: 'Contacto',
    icon: <PhoneOutlined />,
    route: routes.CONTACTO,
  },
  {
    title: 'Admin',
    icon: <UserOutlined />,
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
      </Drawer>
  )
}

export default CustomDrawer
