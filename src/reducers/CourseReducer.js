const initialCourseState = ({
  courseId: 99,
  courseSemester: 'Fall',
  courseYear: '2018'
});

const courseReducer = (state = initialCourseState, action) => {
  switch (action.type) {
    case 'none':
      return {
        ...state
      };
    default:
      return state;
  }
};

export default courseReducer;
