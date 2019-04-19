import { combineReducers } from 'redux';
import courseReducer from './CourseReducer.js';
import contentReducer from './ContentReducer.js';
import sectionInstructorReducer from './SectionInstructorReducer.js';

const rootReducer = combineReducers({
  course: courseReducer,
  content: contentReducer,
  sectionInstructor: sectionInstructorReducer
});

export default rootReducer;
