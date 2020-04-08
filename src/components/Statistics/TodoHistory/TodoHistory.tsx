import React from 'react';
import {Tabs} from 'antd';
import {Todo} from '@/types';
import _ from 'lodash';
import {format} from 'date-fns';
import './TodoHistory.less';
import TodoHistoryItem from '@/components/Statistics/TodoHistoryItem/TodoHistoryItem';

const {TabPane} = Tabs;

interface TodoHistoryProps {
  completed: Todo[]
  deleted: Todo[]
}


const TodoHistory = (props: TodoHistoryProps) => {

  const getCompletedGroup = () => {
    return _.groupBy(props.completed, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d');
    });
  };

  const getDeletedGroup = () => {
    return _.groupBy(props.deleted, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d');
    });
  };


  const getDates = (group: {}) => {
    return Object.keys(group).sort((a, b) => Date.parse(b) - Date.parse(a));
  };


  console.log(getCompletedGroup());
  console.log(getDeletedGroup());


  const completedList = getDates(getCompletedGroup()).map(date => {
    const todos = getCompletedGroup()[date];
    return (
      <div key={date} className="list">
        <div className="title">
          <div>
            <span className="date">{format(new Date(date), 'M月d日')}</span>
            <span>{format(new Date(date), 'E')}</span>
          </div>
          <span>完成了 {todos.length} 个任务</span>
        </div>
        <div className="items">
          {
            todos.map((todo) => {
              return <TodoHistoryItem todo={todo} key={todo.id} itemType="completed"/>;
            })
          }
        </div>
      </div>
    );
  });

  const deletedList = props.deleted.map(todo => {
    return (<TodoHistoryItem todo={todo} key={todo.id} itemType="deleted"/>);
  });

  return (
    <div className="todo-history">
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成任务" key="1">
          {completedList}
        </TabPane>
        <TabPane tab="已删除任务" key="2">
          {deletedList}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TodoHistory;