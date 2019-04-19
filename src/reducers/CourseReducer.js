import { SET_COURSE_DATES } from '../actions/CourseActions.js';

const initialCourseState = ({
  courseId: '99',
  courseSemester: 'Fall',
  courseYear: '2018',
  startDate: '',
  endDate: ''
});

const courseReducer = (state = initialCourseState, action) => {
  switch (action.type) {
    case 'none':
      return {
        ...state
      };
    case SET_COURSE_DATES:
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

export default courseReducer;
