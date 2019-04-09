const initialContentState = ({
  calendar: [],
  announcements: [],
  instructors: [],
  officeHours: [],
  modules: [],
  sections: [],
  sectionGroups: [],
  activities: [],
  assignments: [],
  lectureNotes: []
});

const courseReducer = (state = initialContentState, action) => {
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
