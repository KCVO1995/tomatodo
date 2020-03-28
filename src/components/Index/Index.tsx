import React, {useState, useEffect} from 'react';
import axios from '@/config/axios';
import {useHistory} from 'react-router-dom';

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


const Index = () => {
  const history = useHistory();

  const [user, setUser] = useState({} as Use);

  const getMe = async () => {
    try {
      const response = await axios.get('/me');
      console.log(response);
      setUser(response.data);
    } catch (e) {

    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const logout = () => {
    localStorage.setItem('x-token', '');
    history.push('/login');
  };

  return (
    <div>
      欢迎登陆 {user.id}

      <button onClick={logout}>注销</button>
    </div>
  );
};

export default Index;





