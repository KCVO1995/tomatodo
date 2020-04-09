import React from 'react';
import {connect} from 'react-redux';
import {Todo} from '@/types';
import {initTodos} from '@/redux/actions/todos';


import './Todos.less';
import InputItem from './TodosItem/TodosItem';
import TodosInput from './TodosInput/TodosInput';

interface TodosProps {
  completed: Todo[]
  unCompleted: Todo[]
}

const Todos = (props: TodosProps) => {

  const mainHtml = () => {
    if (props.unCompleted.length > 0 || props.completed.length > 0) {
      return (
        <main className="todoList">
          {
            props.unCompleted.map((t: Todo) => {
              return <InputItem key={t.id} todo={t}/>;
            })
          }
          {
            props.completed.map((t: Todo) => {
              return <InputItem key={t.id} todo={t}/>;
            })
          }
        </main>
      );
    } else {
      return  (
        <main className="no-record">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-todo"/>
          </svg>
          <div>没有记录</div>
        </main>
      )
    }
  };


  return (
    <div className="todos">
      <TodosInput/>
      {mainHtml()}
    </div>
  );
};


const mapStateToProps = (state: { todos: Todo[] }, ownProps: any) => {
  return {...ownProps};
};

const mapDispatchToProps = {initTodos};

export default connect(mapStateToProps, mapDispatchToProps,)(Todos);

