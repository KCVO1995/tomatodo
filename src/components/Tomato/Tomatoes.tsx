import React, {useEffect} from 'react';
import axios from '@/config/axios';
import {startTomato, initTomatoes} from '@/redux/actions/tomatoes';
import {connect} from 'react-redux';


import './Tomatoes.less';
import {Tomato} from '@/types';
import TomatoAction from '@/components/Tomato/TomatoesAction/TomatoesAction';

interface TomatoProps {
  tomatoes: Tomato
  startTomato: (payload: Tomato) => void
  initTomatoes: (payload: Tomato[]) => void
}


const Tomatoes = (props: TomatoProps) => {


  useEffect(() => {
    const getTomatoes = async () => {
      try {
        const response = await axios.get('tomatoes');
        props.initTomatoes(response.data.resources);
      } catch (e) {throw new Error(e);}
    };
    console.log(props.tomatoes);
    getTomatoes()
  }, []);


  const startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 1500000});
      console.log(response.data);
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
  const tomatoes = state.tomatoes;
  return {
    tomatoes,
    ...ownProps
  };
};

const mapDispatchToProps = {startTomato, initTomatoes};

export default connect(mapStateToProps, mapDispatchToProps,)(Tomatoes);
