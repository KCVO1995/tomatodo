import React, {useState} from 'react';
import {Checkbox, Input} from 'antd';
import {EnterOutlined, DeleteFilled} from '@ant-design/icons';
import './InputItem.less'


type UpdateItem = { params: boolean } | { completed: boolean } | { editing: boolean }

interface InputItemProps {
  todo: {
    id: number;
    description: string;
    completed: boolean
    editing: boolean
  };
  updateTodo: (id: number, params: any) => void
  toEdit: (id: number) => void
}

const InputTodos = (props: InputItemProps) => {
  const [editText, setEditText] = useState(props.todo.description);

  const update = (params: any) => {props.updateTodo(props.todo.id, params);};

  const commit = () => {
    if (editText !== '') {
      update({description: editText})
    } else {
      update({deleted: editText})
    }
  };

  const Text = <span onDoubleClick={() => {props.toEdit(props.todo.id);
    console.log(1);}}>{props.todo.description}</span>;
  const Edition = (
    <div className="editing">
      <Input
        placeholder="按回车键确认删除这个任务"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onPressEnter={commit}
      />
      <div>
        <EnterOutlined onClick={commit}/>
        <DeleteFilled onClick={() => update({deleted:true})}/>
      </div>
    </div>
  );

  return (
    <div className="input-todos">
      <Checkbox
        checked={props.todo.completed}
        onChange={e => {update({completed: e.target.checked});}}>
      </Checkbox>
      {props.todo.editing ? Edition : Text}

    </div>
  );
};

export default InputTodos;