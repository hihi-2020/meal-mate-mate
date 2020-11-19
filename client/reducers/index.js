import { combineReducers } from 'redux'
import meals from './meals'
import activePage from './activePage'
import mealComments from './mealComments'
import activeMeal from './activeMeal'

export default combineReducers({
  activePage,
  meals,
  mealComments,
  activeMeal
})
