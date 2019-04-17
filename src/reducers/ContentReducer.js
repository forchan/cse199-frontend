import {
  SET_GENERAL_CONTENT,
  SET_SCHEDULE_CONTENT,
  SET_INSTRUCTORS,
  SET_ANNOUNCEMENTS
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
        activities: action.activities,
        assignments: action.assignments,
        lectureNotes: action.lectureNotes,
        sections: action.sections
      };
    case SET_INSTRUCTORS:
      return {
        ...state,
        instructors: action.instructors
      }
    case SET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.announcements
      }
    default:
      return state;
  }
};

export default courseReducer;
