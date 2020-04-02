import React from 'react';
import axios from '@/config/axios';
import {startTomato} from '@/redux/actions/tomatoes';
import {connect} from 'react-redux';


import './Tomatoes.less'
import {Tomato} from '@/types';
import TomatoAction from '@/components/Tomato/TomatoesAction/TomatoesAction';

interface TomatoProps {
  tomatoes: Tomato
  startTomato: (payload: Tomato) => void
}

const Tomatoes = (props: TomatoProps) => {
  const startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 1500000});
      console.log(response.data.resource);
      props.startTomato(response.data.resource);
      console.log(props.tomatoes);
    } catch (e) {throw new Error(e);}
  };

  return (
    <div className="tomatoes">
      <TomatoAction startTomato={startTomato}/>
    </div>
  );
};


const mapStateToProps = (state: { tomatoes: Tomato[] }, ownProps: any) => {
  console.log(state);
  const tomatoes = state.tomatoes;
  return {
    tomatoes,
    ...ownProps
  };
};

const mapDispatchToProps = {startTomato};

export default connect(mapStateToProps, mapDispatchToProps,)(Tomatoes);
