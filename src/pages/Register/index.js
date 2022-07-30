import React, { useState, useEffect } from 'react';
import { Input, Form, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GlobalActions } from '../../redux/rootAction';
import './style.scss';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Register() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.GlobalReducer.theme);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('userdata')),
  );
  useEffect(() => {
    dispatch(GlobalActions.setIsLoading(false));
  });
  const onSubmit = (values) => {
    const checkAccount = users.some(
      (user) =>
        values.username === user.username && values.password === user.password,
    );
    if (checkAccount) {
      notification.warning({
        message: t('signupfail'),
        style: {
          marginTop: '10vh',
        },
      });
    } else {
      setUsers((user) => {
        const newUser = [...user, values];
        const jsonValue = JSON.stringify(newUser);
        localStorage.setItem('userdata', jsonValue);
        return newUser;
      });
      notification.success({
        message: t('signupsuccess'),
        style: {
          marginTop: '10vh',
        },
      });
      form.resetFields();
      navigate('/login');
    }
  };
  return (
    <div className={theme ? 'register' : 'dark-register'}>
      <div className="register-container">
        <h1>{t('Register')}</h1>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onSubmit}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label={t('User Name')}
            rules={[
              {
                type: 'text',
                message: t('The input is not valid User Name!'),
              },
              {
                required: true,
                message: t('Please input your Username!'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label={t('password')}
            rules={[
              {
                required: true,
                message: t('Please input your Password!'),
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmpass"
            label={t('Confirm Password')}
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: t('Please confirm your password!'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      t('The two passwords that you entered do not match!'),
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout} className="bnt">
            <Button type="primary" htmlType="submit">
              {t('Register')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
