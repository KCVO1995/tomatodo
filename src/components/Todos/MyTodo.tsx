import React, {useState, createContext, useEffect} from 'react';
import InputTodos from '@/components/Todos/InputTodos';
import axios from '@/config/axios';

interface Context {
  description: string;
  setDescription: Function;
  add: boolean;
  setAdd: Function;
}

export const descriptionContext = createContext({} as Context);

const MyTodo = () => {
  const [description, setDescription] = useState('');
  const [add, setAdd] = useState(false);


  useEffect(() => {
    const addTo = async () => {
      try {
        const response = await axios.post('todos', {description});
        console.log(response.data);
        setAdd(false);
        setDescription('');
      } catch (e) {
        throw new Error(e);
      }
    };
    if (add) {
      addTo().then();
    }
  }, [description, add]);


  return (
    <descriptionContext.Provider value={{description, setDescription, add, setAdd}}>
      <div className="todos">
        <InputTodos/>
      </div>
    </descriptionContext.Provider>

  );
};


export default MyTodo;