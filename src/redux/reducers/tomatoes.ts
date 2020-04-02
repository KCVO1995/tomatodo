import {START_TOMATO} from '@/redux/actionTypes';
import {Tomato} from '@/types';

const tomatoes = (state: Tomato[] = [], action: any) => {
  switch (action.type) {
    case START_TOMATO:
      console.log(state);
      console.log(action.payload);
      return [ action.payload, ...state];
    default:
      return state;
  }
};

export default tomatoes;
