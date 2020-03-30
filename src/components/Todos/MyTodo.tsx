import React from 'react';
import InputTodos from '@/components/Todos/InputTodos';
import axios from '@/config/axios';

interface Context {
  description: string;
  setDescription: Function;
  add: boolean;
  setAdd: Function;
}


const MyTodo = () => {


  const addTodo = async (params: {}) => {
    try {
      const response = await axios.post('todos', params);
      console.log(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };


  return (
    <div className="todos">
      <InputTodos addTodo={addTodo} />
    </div>
  );
};


export default MyTodo;