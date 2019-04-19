export const SET_COURSE_DATES = '#setCourseDates';

export const setCourseDates = (startDate, endDate) => ({
  type: SET_COURSE_DATES,
  startDate,
  endDate
});
