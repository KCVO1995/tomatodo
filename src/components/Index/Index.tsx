import React from 'react';
import {useHistory} from 'react-router-dom';
const Index =  () => {
  const history = useHistory()
  const login = () => {
    history.push('/login')
  };
  return (
    <div>
      <button onClick={login}>登陆</button>
      Index
    </div>
  );
}

export default Index





