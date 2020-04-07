import React, {useEffect} from 'react';
import axios from '@/config/axios';
import {startTomato, initTomatoes, updateTomato} from '@/redux/actions/tomatoes';
import {connect} from 'react-redux';
import _ from 'lodash';
import {format} from 'date-fns';


import './Tomatoes.less';
import {Tomato} from '@/types';
import TomatoAction from '@/components/Tomato/TomatoesAction/TomatoesAction';
import TomatoList from '@/components/Tomato/TomatoList/TomatoList';

interface TomatoProps {
  tomatoes: Tomato[]
  unfinishedTomato: Tomato
  finishedTomato: {}
  startTomato: (payload: Tomato) => void
  initTomatoes: (payload: Tomato[]) => void
  updateTomato: (payload: Tomato) => void
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
      props.updateTomato(response.data.resource);
    } catch (e) {throw new Error(e);}
  };

  return (
    <div className="tomatoes">
      <TomatoAction startTomato={startTomato}
                    unfinishedTomato={props.unfinishedTomato}
                    updateTomato={updateTomato}
      />
      <TomatoList finishedTomatoes={props.finishedTomato}/>
    </div>
  );
};


const mapStateToProps = (state: { tomatoes: Tomato[] }, ownProps: any) => {
  const tomatoes = state.tomatoes;
  const unfinishedTomato = state.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0];
  const getfinishedTomato = () => {
    const finished = state.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
    return _.groupBy(finished, (tomato) => {
      return format(new Date(tomato.started_at), 'yyyy-MM-d');
    });
  };
  const finishedTomato = getfinishedTomato();
  return {
    tomatoes,
    unfinishedTomato,
    finishedTomato,
    ...ownProps
  };
};

const mapDispatchToProps = {startTomato, initTomatoes, updateTomato};

export default connect(mapStateToProps, mapDispatchToProps,)(Tomatoes);
