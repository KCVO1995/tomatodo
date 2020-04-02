import {START_TOMATO} from '@/redux/actionTypes';
import {Tomato} from '@/types';


export const startTomato = (payload: Tomato[]) => ({type: START_TOMATO, payload});
