import {
  SET_GENERAL_CONTENT,
  SET_SCHEDULE_CONTENT,
} from '../actions/ContentActions.js';

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
    case SET_GENERAL_CONTENT:
      return {
        ...state,
        announcements: action.announcements,
        calendar: action.calendar,
        instructors: action.instructors,
        modules: action.modules,
        officeHours: action.officeHours,
        sectionGroups: action.sectionGroups
      };
    case SET_SCHEDULE_CONTENT:
      return {
        ...state,
        activites: action.activities,
        assignments: action.assignments,
        lectureNotes: action.lectureNotes,
        sections: action.sections
      };
    default:
      return state;
  }
};

export default courseReducer;
