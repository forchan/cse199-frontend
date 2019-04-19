// explanation of this reducer is contained in CourseInstructorActions.js
import { SET_SECTION_GROUP_INSTRUCTORS } from '../actions/SectionInstructorActions.js';

// these values are hard coded since section group names are set for the course
const initialSectionInstructorsState = ({
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
  F: []
});

const sectionGroupReducer = (state = initialSectionInstructorsState, action) => {
  switch (action.type) {
    case SET_SECTION_GROUP_INSTRUCTORS:
      return {
        ...state,
        [action.sectionGroupName]: action.sectionGroupInstructors
      };
    default:
      return state;
  }
};

export default sectionGroupReducer;
