import React, {useState} from 'react';
import './Statistics.less';
import {Todo} from '@/types';
import Polygon from '@/components/Statistics/Polygon/Polygon';
import _ from 'lodash';
import {format} from 'date-fns';
import TodoHistory from '@/components/Statistics/TodoHistory/TodoHistory';

interface StatisticsProps {
  completed: Todo[]
  deleted: Todo[]
}

const Statistics = (props: StatisticsProps) => {

  const [toggle, setToggle] = useState('');

  const dailyTodo = () => {
    return _.groupBy(props.completed, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d');
    });
  };

  return (
    <div className="statistics">
      <ul>
        <li onClick={() => setToggle('tomato')}
            className={toggle === 'tomato' ? 'active' : ''}>
          <div className="text">
            <span className="title">番茄历史</span>
            <span>累计完成任务</span>
            <span className="count">{props.completed.length}</span>
          </div>
          <Polygon dailyTodo={dailyTodo()} totalCompleted={props.completed.length}/>
        </li>
        <li onClick={() => setToggle('todo')}
            className={toggle === 'todo' ? 'active' : ''}>
          <div className="text">
            <span className="title">番茄历史</span>
            <span>累计完成任务</span>
            <span className="count">{props.completed.length}</span>
          </div>
          <Polygon dailyTodo={dailyTodo()} totalCompleted={props.completed.length}/>
        </li>
      </ul>
      <TodoHistory completed={props.completed} deleted={props.deleted}/>
    </div>
  );
};

export default Statistics;