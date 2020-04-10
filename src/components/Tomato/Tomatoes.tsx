import React from 'react';
import axios from '@/config/axios';
import {startTomato, updateTomato} from '@/redux/actions/tomatoes';
import {connect} from 'react-redux';

import './Tomatoes.less';
import {Tomato} from '@/types';
import TomatoAction from '@/components/Tomato/TomatoesAction/TomatoesAction';
import TomatoList from '@/components/Tomato/TomatoList/TomatoList';

interface TomatoProps {
  unfinishedTomatoes: Tomato[]
  finishedTomatoGroup: {}
  startTomato: (payload: Tomato) => void
  updateTomato: (payload: Tomato) => void
}


const Tomatoes = (props: TomatoProps) => {

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

  const list = () => {
    if (Object.keys(props.finishedTomatoGroup).length > 0) {
      return <TomatoList finishedTomatoGroup={props.finishedTomatoGroup}/>
    } else {
      return (
        <div className="no-record">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-alarm-clock"/>
          </svg>
          <div>没有记录</div>
        </div>
      )
    }
  }

  return (
    <div className="tomatoes">
      <TomatoAction startTomato={startTomato}
                    unfinishedTomato={props.unfinishedTomatoes[0]}
                    updateTomato={updateTomato}
      />
      {list()}
    </div>
  );
};


const mapStateToProps = (state: { tomatoes: Tomato[] }, ownProps: any) => {
  return {...ownProps};
};

const mapDispatchToProps = {startTomato, updateTomato};

export default connect(mapStateToProps, mapDispatchToProps,)(Tomatoes);
