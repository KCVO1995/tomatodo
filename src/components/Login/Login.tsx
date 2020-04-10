import React, {useState} from 'react';
import {Input, message} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import axios from '@/config/axios';
import './Login.less';


const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const error = () => {
    message.error('用户名或密码错误，请重新输入');
  };


  const commit = async () => {
    axios.post('sign_in/user', {
      account,
      password,
    }).then(() => {
      history.push('/');
    }, (e) => {
      if(e.response.status === 422) {
        error()
      }
    });
  };
  return (
    <div className="login">
      <h1>欢迎登陆 Tomatodo</h1>
      <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined/>}
             onChange={(e) => {setAccount(e.target.value);}}/>
      <Input.Password size="large" placeholder="请输入密码" onChange={(e) => {setPassword(e.target.value);}}/>
      <button onClick={commit} className="login-button">登陆</button>
      如果没有账号，请立刻<Link to="/signUp" className="link">注册</Link>
    </div>
  );
};

export default Login;