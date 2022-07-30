import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { PoweroffOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Button, notification, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { SidebarData } from './SidebarData';
import { GlobalActions } from '../../redux/rootAction';
import './style.scss';

export default function Header() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const isLoggedIn = JSON.parse(localStorage.getItem('token-login'));
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const navigate = useNavigate();
  const handleMenuClick = (key) => {
    setSelectedLanguage(key.key);
    i18n.changeLanguage(key.key);
  };
  const changeTheme = () => {
    dispatch(GlobalActions.setTheme());
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'VN',
          key: 'vn',
          icon: (
            <img
              src="/Flag_of_Vietnam.svg.png"
              width={20}
              align="left"
              style={{ opacity: selectedLanguage === 'vn' ? 0.5 : 1 }}
            />
          ),
          disabled: selectedLanguage === 'vn',
        },
        {
          label: 'EN',
          key: 'en',
          icon: (
            <img
              src="/flags-06-512.webp"
              width={20}
              align="left"
              style={{ opacity: selectedLanguage === 'en' ? 0.5 : 1 }}
            />
          ),
          disabled: selectedLanguage === 'en',
        },
      ]}
    />
  );
  const LoggedSidebarData = SidebarData.filter((obj) => {
    if (obj.title !== 'Login' && obj.title !== 'Register') return obj;
  });
  const onLogout = () => {
    navigate('/login');
    localStorage.setItem('token-login', false);
    notification.success({
      message: t('logoutsuccess'),
      style: {
        marginTop: '10vh',
      },
    });
  };
  return (
    <div className="header">
      <div className="header-logo">
        <img src="/corona.png" align="left" />
        <Link to="/home">
          Covid<span>Statistic</span>
        </Link>
      </div>
      <div className="header-items">
        <Space className="space">
          <Switch
            onChange={changeTheme}
            defaultChecked
            checkedChildren={<FaIcons.FaSun style={{ color: 'orange' }} />}
            unCheckedChildren={<FaIcons.FaMoon style={{ color: 'yellow' }} />}
          />
          {isLoggedIn ? (
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<PoweroffOutlined />}
              onClick={() => onLogout()}
            />
          ) : (
            <></>
          )}
          <Dropdown overlay={menu} className="dropdown" trigger={['click']}>
            <Space>
              <AiIcons.AiOutlineGlobal
                cursor={'pointer'}
                className="dropdown-icon"
              />
            </Space>
          </Dropdown>
        </Space>
        <>
          <IconContext.Provider value={{ color: '#fff' }}>
            <div className="navbar">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {isLoggedIn
                  ? LoggedSidebarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })
                  : SidebarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })}
              </ul>
            </nav>
          </IconContext.Provider>
        </>
      </div>
    </div>
  );
}
