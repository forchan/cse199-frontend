import { combineReducers } from 'redux';
import courseReducer from './CourseReducer.js';
import contentReducer from './ContentReducer.js';

const rootReducer = combineReducers({
  course: courseReducer,
  content: contentReducer
});

export default rootReducer;
