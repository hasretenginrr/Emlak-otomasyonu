import React, { useState } from 'react';
import { Button, Input, Form, Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../image/ara-bul.png'; 

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    console.log('Success:', values);
    const { username, password } = values;

    if (username === 'emlakofisi' && password === '12345') {
      message.success('Giriş başarılı!');
      onLogin();
      navigate('/ev-listele');  
    } else {
      message.error('Kullanıcı adı veya şifre hatalı!');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" className="login-logo" /> 
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Kullanıcı adı"
            name="username"
            rules={[{ required: true, message: 'Lütfen geçerli bir kullanıcı adı giriniz!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: 'Lütfen geçerli bir şifre giriniz!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Beni Hatırla</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Giriş
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
