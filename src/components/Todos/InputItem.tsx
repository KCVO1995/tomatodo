import React, {useState} from 'react';
import {Checkbox, Input} from 'antd';
import {EnterOutlined, DeleteFilled} from '@ant-design/icons';
import classNames from 'classnames';
import './InputItem.less';
import {Todo} from '@/types';


interface InputItemProps {
  todo: Todo;
  updateTodo: (id: number, params: any) => void
  toEdit: (id: number) => void
}

const InputTodos = (props: InputItemProps) => {
  const [editText, setEditText] = useState(props.todo.description);

  const update = (params: any) => {props.updateTodo(props.todo.id, params);};

  const commit = () => {
    editText !== '' ?
      update({description: editText})
      : update({deleted: editText});
  };

  const Text = <span onDoubleClick={() => props.toEdit(props.todo.id)}>{props.todo.description}</span>;

  const Edition = (
    <div className="editing">
      <Input
        placeholder="按回车键确认删除这个任务"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onPressEnter={commit}
        autoFocus={true}
      />
      <div className="iconWrapper">
        <EnterOutlined onClick={commit}/>
        <DeleteFilled onClick={() => update({deleted: true})}/>
      </div>
    </div>
  );

  const todoItemClass = classNames({
    'input-todos': true,
    editing: props.todo.editing,
    completed: props.todo.completed
  });


  return (
    <div className={todoItemClass}>
      <Checkbox
        checked={props.todo.completed}
        onChange={e => {update({completed: e.target.checked});}}>
      </Checkbox>
      {props.todo.editing ? Edition : Text}
    </div>
  );
};

export default InputTodos;