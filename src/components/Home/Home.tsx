import React, {useState, useEffect} from 'react';
import axios from '@/config/axios';
import {useHistory} from 'react-router-dom';
import {Menu, Dropdown} from 'antd/es';
import {DownOutlined} from '@ant-design/icons';
import '@/components/Home/Home.less';
import Todos from '@/components/Todos/Todos';
import Tomatoes from '@/components/Tomato/Tomatoes';
import {Todo, Tomato} from '@/types';
import {initTodos} from '@/redux/actions/todos';
import {connect} from 'react-redux';
import _ from 'lodash';
import {format} from "date-fns";
import {initTomatoes} from '@/redux/actions/tomatoes';
import Statistics from '@/components/Statistics/Statistics';

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


interface HomeProps {
  initTodos: (todos: Todo[]) => void
  completed: Todo[]
  unCompleted: Todo[]
  unfinishedTomato: Tomato[]
  finishedTomato: {}
  initTomatoes: (payload: Tomato[]) => void
}

const Home = (props: HomeProps) => {
  const history = useHistory();

  const [user, setUser] = useState({} as Use);

  const getMe = async () => {
    const response = await axios.get('/me');
    setUser(response.data);
  };

  const getTodo = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((t: Todo) =>
        Object.assign({}, t, {editing: false})
      );
      props.initTodos(todos);
    } catch (e) {throw new Error(e);}
  };

  const getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      props.initTomatoes(response.data.resources);
    } catch (e) {throw new Error(e);}
  };

  useEffect( () => {
    getMe();
    getTodo();
    getTomatoes()
  }, []);

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
            <span>{user.account}</span><DownOutlined/>
          </a>
        </Dropdown>
      </header>
      <main>
        <Tomatoes finishedTomato={props.finishedTomato} unfinishedTomato={props.unfinishedTomato}/>
        <Todos  completed={props.completed} unCompleted={props.unCompleted}/>
      </main>
      <Statistics completed={props.completed}/>
    </div>
  );
};

const mapStateToProps = (state: { todos: Todo[],tomatoes: Tomato[] }, ownProps: any) => {
  const todos = state.todos;
  const deleted = todos.filter(t => !t.deleted);
  const completed = deleted.filter(t => t.completed) || [];
  const unCompleted = deleted.filter(t => !t.completed) || [];

  const tomatoes = state.tomatoes;
  const unfinishedTomato = state.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0];
  const getfinishedTomato = () => {
    const finished = state.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
    return _.groupBy(finished, (tomato) => {
      return format(new Date(tomato.started_at), 'yyyy-MM-d');
    });
  };
  const finishedTomato = getfinishedTomato();
  return {
    todos,
    completed,
    unCompleted,
    tomatoes,
    unfinishedTomato,
    finishedTomato,
    ...ownProps
  };
};

const mapDispatchToProps = {initTodos,initTomatoes};

export default connect(mapStateToProps, mapDispatchToProps)(Home);








