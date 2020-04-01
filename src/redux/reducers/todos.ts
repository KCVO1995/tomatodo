import {Todo} from '@/types';
import {ADD_TODO} from '../actionTypes'

const todos = (state: Todo[], action: any) => {
  state = state || [];
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default todos;