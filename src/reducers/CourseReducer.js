import {
  SET_COURSE_DATES,
  SET_SEMESTERS,
  SET_COURSE_DETAILS
} from '../actions/CourseActions.js';

const initialCourseState = ({
  semesters: [],
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
    case SET_SEMESTERS:
      return {
        ...state,
        semesters: action.semesters
      };
    case SET_COURSE_DETAILS:
      return {
        ...state,
        courseId: action.courseId,
        courseYear: action.courseYear,
        courseSemester: action.courseSemester
      };
    default:
      return state;
  }
};

export default courseReducer;
