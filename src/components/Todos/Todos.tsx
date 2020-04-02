import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from '@/config/axios';
import {Todo} from '@/types';
import {initTodos} from '@/redux/actions/todos';


import './Todos.less';
import InputItem from './TodosItem/TodosItem';
import TodosInput from './TodosInput/TodosInput';

interface TodosProps {
  todos: Todo[]
  completed: Todo[]
  unCompleted: Todo[]
  initTodos: (todos: Todo[]) => void
  updateTodo: (id: number, params: any) => Todo[]
  editTodo: (id: number) => Todo[]
}

const Todos = (props: TodosProps) => {

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await axios.get('todos');
        const todos = response.data.resources.map((t: Todo) =>
          Object.assign({}, t, {editing: false})
        );
        props.initTodos(todos);
      } catch (e) {throw new Error(e);}
    };
    getTodo().then();
  }, []);


  return (
    <div className="todos">
      <TodosInput/>
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
    </div>
  );
};


const mapStateToProps = (state: { todos: Todo[] }, ownProps: any) => {
  const todos = state.todos;
  const deleted = todos.filter(t => !t.deleted);
  const completed = deleted.filter(t => t.completed);
  const unCompleted = deleted.filter(t => !t.completed);
  return {
    todos,
    completed,
    unCompleted,
    ...ownProps
  };
};

const mapDispatchToProps = {initTodos};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(Todos);

