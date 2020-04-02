import {ADD_TOMATO} from '@/redux/actionTypes';

const tomato = (state: any[], action: any) => {
  state = state || [];
  switch (action.type) {
    case ADD_TOMATO:
      return [ action.payload,...state];
    default:
      return state;
  }
};

export default tomato;
