import React, {useEffect} from 'react';
import axios from '@/config/axios';
import {startTomato, initTomatoes, updateTomatoes} from '@/redux/actions/tomatoes';
import {connect} from 'react-redux';


import './Tomatoes.less';
import {Tomato} from '@/types';
import TomatoAction from '@/components/Tomato/TomatoesAction/TomatoesAction';

interface TomatoProps {
  tomatoes: Tomato[]
  unfinishedTomato: Tomato
  startTomato: (payload: Tomato) => void
  initTomatoes: (payload: Tomato[]) => void
  updateTomatoes: (payload: Tomato) => void
}


const Tomatoes = (props: TomatoProps) => {


  useEffect(() => {
    const getTomatoes = async () => {
      try {
        const response = await axios.get('tomatoes');
        props.initTomatoes(response.data.resources);
      } catch (e) {throw new Error(e);}
    };
    getTomatoes();
  }, []);


  const startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 1500000});
      props.startTomato(response.data.resource);
    } catch (e) {throw new Error(e);}
  };

  const updateTomato = async (id: number, params: any) => {
    try {
      const response = await axios.put(`tomatoes/${id}`, params);
      console.log(response.data.resource);
      props.updateTomatoes(response.data.resource);
    } catch (e) {throw new Error(e);}
  };

  return (
    <div className="tomatoes">
      <TomatoAction startTomato={startTomato}
                    unfinishedTomato={props.unfinishedTomato}
                    updateTomato={updateTomato}
      />
    </div>
  );
};


const mapStateToProps = (state: { tomatoes: Tomato[] }, ownProps: any) => {
  const tomatoes = state.tomatoes;
  const unfinishedTomato = state.tomatoes.filter(t => !t.description && !t.ended_at)[0];
  console.log(unfinishedTomato);
  // @ts-ignore
  return {
    tomatoes,
    unfinishedTomato,
    updateTomatoes,
    ...ownProps
  };
};

const mapDispatchToProps = {startTomato, initTomatoes};

export default connect(mapStateToProps, mapDispatchToProps,)(Tomatoes);