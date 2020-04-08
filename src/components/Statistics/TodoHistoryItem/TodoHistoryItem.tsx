import {Todo} from '@/types';
import {format} from 'date-fns';
import React from 'react';
import './TodoHistoryItem.less';
import {updateTodo} from '@/redux/actions/todos';
import {connect} from 'react-redux';
import axios from '@/config/axios';

interface TodoHistoryItemProps {
  itemType: string
  data: any
  updateTodo: (payload: Todo) => void
}

const TodoHistoryItem = (props: TodoHistoryItemProps) => {

  console.log(props.data);

  const updateTodo = async (params: any) => {
    const {id} = props.data;
    try {
      const response = await axios.put(`todos/${id}`, params);
      props.updateTodo(response.data.resource);
    } catch (e) {throw new Error(e);}
  };

  const action = () => {
    if (props.itemType === 'completed' || props.itemType === 'finishedTomato') {
      return (
        <div className="action">
          <span onClick={() => updateTodo({completed: false})}>恢复 </span>
          <span onClick={() => updateTodo({deleted: true})}>删除</span>
        </div>
      );
    } else if (props.itemType === 'deleted' || props.itemType === 'unfinishedTomato') {
      return (
        <div className="action">
          <span onClick={() => updateTodo({deleted: false})}>恢复</span>
        </div>
      );
    }
  };

  const time = () => {
    if (props.itemType === 'completed') {
      return (
        <span className="time">{format(new Date(props.data.updated_at), 'HH:mm')}</span>
      );
    } else if (props.itemType === 'deleted') {
      return (
        <span className="time">{format(new Date(props.data.updated_at), 'M月d日')}</span>
      );
    } else if (props.itemType === 'finishedToamto') {
      return (
        <span className="time">
          {format(new Date(props.data.started_at), 'HH:mm')}
          -
          {format(new Date(props.data.ended_at), 'HH:mm')}
        </span>
      );
    } else if (props.itemType === 'abortTomato') {
      return (
        <span className="time">{format(new Date(props.data.started_at), 'M月d日')}</span>
      );
    }

  };


  return (
    <div className="item">
      <div>
        {time()}
        <span>{props.data.description || '这是一个没有描述的番茄'}</span>
      </div>
      {action()}
    </div>
  );
};


const mapStateToProps = (state: { todos: Todo[] }, ownProps: any) => {
  return {
    ...ownProps
  };
};

const mapDispatchToProps = {
  updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps,)(TodoHistoryItem);

