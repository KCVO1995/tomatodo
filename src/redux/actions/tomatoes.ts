import {START_TOMATO,INIT_TOMATOES, UPDATE_TOMATO} from '@/redux/actionTypes';
import {Tomato} from '@/types';


export const startTomato = (payload: Tomato[]) => ({type: START_TOMATO, payload});
export const initTomatoes = (payload: Tomato[]) => ({type: INIT_TOMATOES, payload});
export const updateTomato = (payload: Tomato) => ({type: UPDATE_TOMATO, payload});
