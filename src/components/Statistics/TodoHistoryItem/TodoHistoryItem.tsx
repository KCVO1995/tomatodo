import {Todo} from '@/types';
import {format} from 'date-fns';
import React from 'react';
import './TodoHistoryItem.less';
import {updateTodo} from '@/redux/actions/todos';
import {connect} from 'react-redux';
import axios from '@/config/axios';

interface TodoHistoryItemProps {
  itemType: string
  todo: Todo
  updateTodo: (payload: Todo) => void
}

const TodoHistoryItem = (props: TodoHistoryItemProps) => {


  const updateTodo = async (params: any) => {
    const {id} = props.todo;
    try {
      const response = await axios.put(`todos/${id}`, params);
      props.updateTodo(response.data.resource);
    } catch (e) {throw new Error(e);}
  };

  const action = () => {
    if (props.itemType === 'completed') {
      return (
        <div className="action">
          <span onClick={() => updateTodo({completed: false})}>恢复 </span>
          <span onClick={() => updateTodo({deleted: true})}>删除</span>
        </div>
      );
    } else {
      return (
        <div className="action">
          <span onClick={() => updateTodo({deleted: false})}>恢复</span>
        </div>
      );
    }
  };

  const formatText = props.itemType === 'completed' ? 'HH:mm' : 'M月d日'

  return (
    <div className="item">
      <div>
        <span className="time">{format(new Date(props.todo.updated_at), formatText)}</span>
        <span>{props.todo.description}</span>
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

