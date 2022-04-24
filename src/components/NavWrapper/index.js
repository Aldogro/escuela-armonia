
import React, { useState } from 'react'
import { Layout } from 'antd'

import { MenuOutlined } from '@ant-design/icons'
import CustomDrawer from '../CustomDrawer'
import logoHorizontal from 'assets/images/logo-horizontal.svg'

import './NavWrapper.css'

const { Header, Content } = Layout

const NavWrapper = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => setCollapsed(!collapsed)

  return (
    <div className="nav-wrapper">
      <CustomDrawer collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Layout>
        <Layout className="site-layout">
          <Header className="site-layout-background layout-header" style={{ padding: 0 }}>
            <div className="layout-header--wrapper">
              <MenuOutlined
                className="trigger"
                onClick={toggleCollapsed}
              />
              <img src={logoHorizontal} height="50px" alt="logo" /><b>Terapias complementarias</b>
            </div>
          </Header>
          <Content className="site-layout-background layout-content">
            <div className="layout-content--wrapper">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default NavWrapper
