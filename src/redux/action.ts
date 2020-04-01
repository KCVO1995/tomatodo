import {Todo} from '@/types';

export const addTodo = (payload: Todo) => ({
  type: 'ADD_TODO',
  payload
});