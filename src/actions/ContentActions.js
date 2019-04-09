/* There are 2 types of functions here - "load Stuff" and "set Stuff".
 *
 * "Load" functions are exported to be used throughout the app. They contain API
 * GET calls, and therefore need to wait for an API response. Once all responses
 * are retrieved,
 * - the "load" functions will finally call their corresponding "set" functions
 * - to pass the "action" object to the "reducers"
 * - then the reducers update the redux store accordingly.
 *
 * Notes:
 * - Some load functions are named reload to avoid variable collisions from
 *   the load utils being imported. Also, reload functions are actually used
 *   for reloading the redux store, after making API POST calls.
 * - Using these functions described above is part of redux and thunk logic.
 * - Actions and reducers and dispatch are part of just plain redux logic.
 */
import {
  loadActivities,
  loadAnnouncements,
  loadAssignments,
  loadCalendar,
  loadInstructors,
  loadLectureNotes,
  loadModules,
  loadOfficeHours,
  loadSections,
  loadSectionGroups
} from '../utils/ApiHelperUtils.js';
// Action constants are used here and the corresponding Reducer
export const SET_GENERAL_CONTENT = '#setGeneralContent';
export const SET_SCHEDULE_CONTENT = '#setScheduleContent';
export const SET_INSTRUCTORS = '#setInstructors';


const setGeneralContent = contentObject => ({
  type: SET_GENERAL_CONTENT,
  announcements: contentObject.announcements,
  calendar: contentObject.calendar,
  instructors: contentObject.instructors,
  modules: contentObject.modules,
  officeHours: contentObject.officeHours,
  sectionGroups: contentObject.sectionGroups
});

export const loadGeneralContent = courseId => async (dispatch) => {
  const announcements = await loadAnnouncements(courseId);
  const calendar = await loadCalendar(courseId);
  const instructors = await loadInstructors();
  const modules = await loadModules(courseId);
  const officeHours = await loadOfficeHours(courseId);
  const sectionGroups = await loadSectionGroups(courseId);

  const contentObject = {
    announcements,
    calendar,
    instructors,
    modules,
    officeHours,
    sectionGroups
  };

  dispatch(setGeneralContent(contentObject));
};

const setScheduleContent = contentObject => ({
  type: SET_SCHEDULE_CONTENT,
  activities: contentObject.activities,
  assignments: contentObject.assignments,
  lectureNotes: contentObject.lectureNotes,
  sections: contentObject.sections
});

export const loadScheduleContent = courseId => async (dispatch) => {
  const activities = await loadActivities(courseId);
  const assignments = await loadAssignments(courseId);
  const lectureNotes = await loadLectureNotes(courseId);
  const sections = await loadSections(courseId);

  const contentObject = {
    activities,
    assignments,
    lectureNotes,
    sections
  };

  dispatch(setScheduleContent(contentObject));
};

const setInstructors = instructors => ({
  type: SET_INSTRUCTORS,
  instructors
});

export const reloadInstructors = courseId => async (dispatch) => {
  const instructors = await loadInstructors(courseId);
  dispatch(setInstructors(instructors));
};
