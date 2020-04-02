import { combineReducers } from 'redux'
import todos from './todos'
import tomato from './tomato'

export default combineReducers({
  todos,
  tomato
})