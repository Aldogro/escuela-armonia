import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom';

import './Breadcrumbs.css'

const Breadcrumbs = ({ items = [] }) => (
  <div className="breadcrumbs-wrapper">
    <Breadcrumb>
      {items.map(({ route, icon, content }) => (
        <Breadcrumb.Item key={route}>
          <Link to={route}>
            {icon && icon} {content}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  </div>
);

export default Breadcrumbs