import React, {useState} from 'react';
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';

interface InputTodosProps {
  addTodo: (params: {description: string}) => void
}

const InputTodos = (props: InputTodosProps) => {
  const [description, setDescription] = useState('');

  const commit = () => {
    if (description !== '') {
      props.addTodo({description});
      setDescription('');
    } else {
      alert('请指定一个todo');
    }
  };

  return (
    <div className="todo-input">
      <Input size="large"
             placeholder="添加新任务"
             suffix={description ? <EnterOutlined onClick={commit}/> : <span/>}
             onChange={e => setDescription(e.target.value)}
             onPressEnter={commit}
             value={description}
      />
    </div>
  );
};

export default InputTodos;