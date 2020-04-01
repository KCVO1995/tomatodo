import React, {useState} from 'react';
import {Input} from 'antd';
import {connect} from 'react-redux';
import {addTodo} from '@/redux/action';
import {EnterOutlined} from '@ant-design/icons';
import axios from '@/config/axios';

interface InputTodosProps {
  addTodo: (params: { description: string }) => void
}

const TodosInput = (props: InputTodosProps) => {
  const [description, setDescription] = useState('');

  const commit = async () => {
    if (description !== '') {
      try {
        const response = await axios.post('todos', {description});
        console.log(props);
        props.addTodo(response.data.resource);
        setDescription('');
      } catch (e) {throw new Error(e);}
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


const mapStateToProps = (ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  addTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodosInput);