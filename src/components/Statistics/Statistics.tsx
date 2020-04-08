import React from 'react';
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

  const dailyTodo = () => {
    return _.groupBy(props.completed, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d');
    })
  };


  return (
    <>
      <ul className="statistics">
        <li>统计</li>
        <li>目标</li>
        <li>番茄历史</li>
        <li>
          历史任务
          累计完成任务{props.completed.length}
          <Polygon dailyTodo={dailyTodo()} totalCompleted={props.completed.length}/>
        </li>
      </ul>
      <TodoHistory completed={props.completed} deleted={props.deleted}/>
    </>
  );
};

export default Statistics;