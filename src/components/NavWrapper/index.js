
import React, { useState } from 'react'
import { BackTop, Layout } from 'antd'
import { MenuOutlined, UpOutlined } from '@ant-design/icons'
import { FacebookContact, InstagramContact, WhatsappContact } from 'components/SocialMediaContacts'
import CustomDrawer from '../CustomDrawer'
import logoHorizontal from 'assets/images/logo-horizontal.svg'

import './NavWrapper.css'
import CustomErrorBoundary from 'components/ErrorBoundary'

const { Header, Content, Footer } = Layout

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
            <CustomErrorBoundary>
              {children}
            </CustomErrorBoundary>
          </Content>
          <Footer className="layout-footer">
            <label className="copyright">Escuela Armonía ©{new Date().getFullYear()}</label>
            <div className="social-media">
              <FacebookContact />
              <InstagramContact />
              <WhatsappContact />
            </div>
          </Footer>
        </Layout>
      </Layout>
      <BackTop>
        <div className="back-to-top">
          <UpOutlined className="back-to-top--icon" />
        </div>
      </BackTop>
    </div>
  )
}

export default NavWrapper
