import React, {useContext} from 'react';
import {descriptionContext} from '@/components/Todos/MyTodo';
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';

const InputTodos = () => {
  const {setDescription, setAdd, description} = useContext(descriptionContext);

  const commit = () => {
    if (description === '') {
      alert('请指定一个任务');
    } else {
      setAdd(true);
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