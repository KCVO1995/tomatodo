import React from 'react';
import {Button} from 'antd';
import axios from '@/config/axios';
import {addTomato} from '@/redux/actions';
import {connect} from 'react-redux';

const TomatoAction = (props: any) => {
  const addTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 1500000});
      props.addTomato(response.data.resource);
      console.log(props.tomato);
    } catch (e) {throw new Error(e);}
  };

  return (
    <div className="tomato-action">
      <Button onClick={addTomato}>开始一个番茄</Button>
    </div>
  );
};


const mapStateToProps = (state: { tomato: any[] }, ownProps: any) => {
  const tomato = state.tomato;
  return {
    tomato,
    ...ownProps
  };
};

const mapDispatchToProps = {addTomato};

export default connect(mapStateToProps, mapDispatchToProps,)(TomatoAction);
