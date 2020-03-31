import React, {useState, useEffect} from 'react';
import axios from '@/config/axios';
import {useHistory} from 'react-router-dom';
import {Menu, Dropdown } from 'antd/es'
import { DownOutlined } from '@ant-design/icons';
import '@/components/Index/Index.less'
import Todos from '@/components/Todos/myTodos.tsx'

interface Use {
  id: number
  name: string
  avatar: string
  extra: string
  account: string
  created_at: Date
  updated_at: Date
  deleted: boolean
}

const Index = (props: any) => {
  const history = useHistory();

  const [user, setUser] = useState({} as Use);

  const getMe = async () => {
    const response = await axios.get('/me');
    setUser(response.data);
  };

  useEffect(() => {getMe();}, []);

  const logout = () => {
    localStorage.setItem('x-token', '');
    history.push('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>偏好设置</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={logout}>
        <span>登出</span>
      </Menu.Item>
    </Menu>
  );


  return (
    <div className="index">
      <header>
        <h1>Tomatodo</h1>
        <Dropdown overlay={menu} trigger={['click']}>
          <a href=" " className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <span>{user.account}</span><DownOutlined />
          </a>
        </Dropdown>
      </header>
      <Todos />
    </div>
  );
};





export default Index;





