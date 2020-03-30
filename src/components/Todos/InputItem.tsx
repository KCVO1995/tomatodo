import React from 'react';
import {Checkbox} from 'antd';

interface InputItemProps {
  todo: {
    id: number;
    description: string;
    completed: boolean
  };
  updateTodo: (id: number, params: { completed: boolean }) => void
}

const InputTodos = (props: InputItemProps) => {

  const update = (completed: boolean) => {
    console.log(completed);
    props.updateTodo(props.todo.id, {completed});
  };

  return (
    <div className="input-todos">
      <Checkbox
        checked={props.todo.completed}
        onChange={e => {update(e.target.checked);}}>
        <span>{props.todo.description}</span>
      </Checkbox>
    </div>
  );
};

export default InputTodos;