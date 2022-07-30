import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { notification, Button, Input, Form } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './style.scss';
import { GlobalActions } from '../../redux/rootAction';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const theme = useSelector((state) => state.GlobalReducer.theme);
  useEffect(() => {
    dispatch(GlobalActions.setIsLoading(false));
    const account = [{ username: 'admin', password: 'admin' }];
    localStorage.setItem('userdata', JSON.stringify(account));
    const items = JSON.parse(localStorage.getItem('userdata'));
    if (items) {
      setUsers(items);
    }
  }, []);
  const handleUserSubmit = (values) => {
    const checkAccount = users.some(
      (user) =>
        values.username === user.username && values.password === user.password,
    );
    if (checkAccount) {
      localStorage.setItem('token-login', JSON.stringify(true));
      notification.success({
        message: t('loginsuccess'),
        style: {
          marginTop: '10vh',
        },
      });
      navigate('/home');
    } else
      notification.error({
        message: t('loginfail'),
        style: {
          marginTop: '10vh',
        },
      });
  };
  return (
    <div className={theme ? 'login' : 'dark-login'}>
      <div className="login-container">
        <h1>{t('login')}</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleUserSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: t('Please input your Username!'),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t('Username')}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t('Please input your Password!'),
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('password')}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {t('login')}
            </Button>
            {t('Or')}
            <Link to="/register">
              <span> {t('register now!')}</span>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
