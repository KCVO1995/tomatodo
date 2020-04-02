import {INIT_TOMATOES, START_TOMATO} from '@/redux/actionTypes';
import {Tomato} from '@/types';

const tomatoes = (state: Tomato[] = [], action: any) => {
  switch (action.type) {
    case START_TOMATO:
      console.log(state);
      return [action.payload, ...state];
    case INIT_TOMATOES:
      return [action.payload];
    default:
      return state;
  }
};

export default tomatoes;
