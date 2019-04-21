/* selectors are used to select and retrieve desired state from redux store */
export const getCourseId = state => state.course.courseId;
export const getCourseSemester = state => state.course.courseSemester;
export const getCourseYear = state => state.course.courseYear;
export const getStartDate = state => state.course.startDate;
export const getEndDate = state => state.course.endDate;
