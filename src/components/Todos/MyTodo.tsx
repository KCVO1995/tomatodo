import React, {useEffect, useState} from 'react';
import InputTodos from '@/components/Todos/InputTodos';
import InputItem from '@/components/Todos/InputItem';
import axios from '@/config/axios';

interface Todos {
  id: string;
  description: string;
  completed: boolean
}

const MyTodo = () => {
  const [todoList, setTodoList] = useState([] as Todos[]);

  const addTodo = async (params: {}) => {
    try {
      const response = await axios.post('todos', params);
      console.log(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };

  const getTodo = async () => {
    try {
      const response = await axios.get('todos');
      setTodoList(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };

  const updateTodo = async (id: number, params: any) => {
    try {
      const response = await axios.put(`todos/${id}`, params);
      console.log(response.data.resource);
      const newTodos = todoList.map(t => {
        if (parseFloat(t.id) === id) {
          return response.data.resource;
        } else {
          return t;
        }
      });
      setTodoList(newTodos);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);


  return (
    <div className="todos">
      <InputTodos addTodo={addTodo}/>
      {
        todoList && todoList.map(t => {
          return <InputItem key={t.id} todo={t} updateTodo={updateTodo}/>;
        })
      }
    </div>
  );
};


export default MyTodo;