import {INIT_TOMATOES, START_TOMATO, UPDATE_TOMATO} from '@/redux/actionTypes';
import {Tomato} from '@/types';

const tomatoes = (state: Tomato[] = [], action: any) => {
  switch (action.type) {
    case START_TOMATO:
      return [action.payload, ...state];
    case INIT_TOMATOES:
      return action.payload;
    case UPDATE_TOMATO:
      return state.map(t => t.id === action.payload.id ?
      action.payload : t);
    default:
      return state;
  }
};

export default tomatoes;
