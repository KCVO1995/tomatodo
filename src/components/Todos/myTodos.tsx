import React, {useEffect, useState} from 'react';
import InputTodos from '@/components/Todos/InputTodos';
import InputItem from '@/components/Todos/InputItem';
import './myTodos.less'
import axios from '@/config/axios';
import {Todo} from '@/types';


const Todos = () => {
  const [todoList, setTodoList] = useState([] as Todo[]);
  // eslint-disable-next-line
  const [unDeleted, setUnDeleted] = useState([] as Todo[]);
  const [unCompleted, setUnCompleted] = useState([] as Todo[]);
  const [complete, setComplete] = useState([] as Todo[]);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await axios.get('todos');
        const newTodoList = response.data.resources.map((t: Todo) =>
          Object.assign({}, t, {editing: false})
        );
        reset(newTodoList);
      } catch (e) {throw new Error(e);}
    };
    getTodo().then();
  }, []);


  const reset = (newTodoList: Todo[]) => {
    const deleted = newTodoList.filter(t => !t.deleted);
    setTodoList(newTodoList);
    setUnDeleted(deleted);
    setComplete(deleted.filter(t => t.completed));
    setUnCompleted(deleted.filter(t => !t.completed));
  };

  const addTodo = async (params: {}) => {
    try {
      const response = await axios.post('todos', params);
      reset([response.data.resource,...todoList])
    } catch (e) {throw new Error(e);}
  };

  const updateTodo = async (id: number, params: any) => {
    try {
      const response = await axios.put(`todos/${id}`, params);
      const newTodoList = todoList.map(t => t.id === id ? response.data.resource : t);
      reset(newTodoList);
    } catch (e) {throw new Error(e);}
  };

  const toEdit = (id: number) => {
    const newTodoList = todoList.map(t => t.id === id ?
      Object.assign({}, t, {editing: true})
      : Object.assign({}, t, {editing: false}));
    reset(newTodoList);
  };


  return (
    <div className="todos">
      <InputTodos addTodo={addTodo}/>
      <main className="todoList">
        {
          todoList && unCompleted.map(t => {
            return <InputItem key={t.id} todo={t} updateTodo={updateTodo} toEdit={toEdit}/>;
          })
        }
        {
          complete && complete.map(t => {
            return <InputItem key={t.id} todo={t} updateTodo={updateTodo} toEdit={toEdit}/>;
          })
        }
      </main>
    </div>
  );
};

export default Todos;