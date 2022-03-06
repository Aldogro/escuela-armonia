
import React, { useState } from 'react'
import { Layout } from 'antd'

import { MenuOutlined } from '@ant-design/icons'

import CustomDrawer from './CustomDrawer'

import logoHorizontal from './assets/images/logo-horizontal.svg'
import './App.css'

const { Header, Content } = Layout

const App = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => setCollapsed(!collapsed)

  return (
    <div className="App">
      <CustomDrawer collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Layout>
        <Layout className="site-layout">
          <Header className="site-layout-background layout-header" style={{ padding: 0 }}>
            <MenuOutlined
              className="trigger"
              onClick={toggleCollapsed}
            />
            <img src={logoHorizontal} height="50px" alt="logo" /><b>Escuela de terapias complementarias</b>
          </Header>
          <Content
            className="site-layout-background layout-content"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 'calc(100vh - 112px)',
            }}
          >
            Contenido
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
