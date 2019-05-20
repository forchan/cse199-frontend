export const getSemesterObjectFromArrayByCourseId = (courseId, semesterArray) => {
  const selectedSemesterObjectInArray = semesterArray.filter(semester => (
    semester.course_id === courseId
  ));
  return selectedSemesterObjectInArray[0];
};
