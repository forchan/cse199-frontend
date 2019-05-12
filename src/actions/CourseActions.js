import { loadCourseList } from '../utils/ApiHelperUtils.js';
import { COURSE_NUMBER } from '../constants/CourseConstants.js';
export const SET_COURSE_DATES = '#setCourseDates';
export const SET_SEMESTERS = '#setSemesters';

export const setCourseDates = (startDate, endDate) => ({
  type: SET_COURSE_DATES,
  startDate,
  endDate
});

const setSemesters = semesters => ({
  type: SET_SEMESTERS,
  semesters
});

export const loadSemesters = () => async (dispatch) => {
  const entireCourseList = await loadCourseList();
  const cse199Semesters = entireCourseList.filter(course => (
    course.course_number === COURSE_NUMBER
  ));
  dispatch(setSemesters(cse199Semesters));
};
