import React from 'react'

import { Drawer } from 'antd'
import {
  BulbOutlined,
  HomeOutlined,
  PhoneOutlined,
  ReadOutlined,
  UserOutlined
} from '@ant-design/icons'

import logoHorizontal from './assets/images/logo-horizontal.svg'
import './CustomDrawer.css'

const menuItems = [
  {
    title: 'Inicio',
    icon: <HomeOutlined />,
    route: '/'
  },
  {
    title: 'Cursos',
    icon: <BulbOutlined />,
    route: '/courses'
  },
  {
    title: 'Blog',
    icon: <ReadOutlined />,
    route: '/blog'
  },
  {
    title: 'Contacto',
    icon: <PhoneOutlined />,
    route: '/contact'
  },
  {
    title: 'Admin',
    icon: <UserOutlined />,
    route: '/admin'
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
          <div className="menu-item">
            {menuItem.icon}
            {menuItem.title}
          </div>
        ))}
      </Drawer>
  )
}

export default CustomDrawer