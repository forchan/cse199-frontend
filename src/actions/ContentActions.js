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
import { setCourseDates, loadSemesters } from './CourseActions.js';
import { loadAllSectionGroupInstructors } from './SectionInstructorActions.js';

// Action constants are used here and the corresponding Reducer
export const SET_GENERAL_CONTENT = '#setGeneralContent';
export const SET_SCHEDULE_CONTENT = '#setScheduleContent';
export const SET_INSTRUCTORS = '#setInstructors';
export const SET_ANNOUNCEMENTS = '#setAnnouncements';
export const SET_MATERIALS = '#setMaterials';
export const SET_MODULES = '#setModules';
export const SET_SECTIONS = '#setSections';


const setGeneralContent = contentObject => ({
  type: SET_GENERAL_CONTENT,
  announcements: contentObject.announcements,
  calendarBlocks: contentObject.calendarBlocks,
  instructors: contentObject.instructors,
  modules: contentObject.modules,
  officeHours: contentObject.officeHours,
  sectionGroups: contentObject.sectionGroups
});

// loadGeneralContent also calls load functions from other action classes
const loadGeneralContent = courseId => async (dispatch) => {
  const announcements = await loadAnnouncements(courseId);
  const instructors = await loadInstructors();
  const modules = await loadModules(courseId);
  const officeHours = await loadOfficeHours(courseId);
  const sectionGroups = await loadSectionGroups(courseId);
  const calendar = await loadCalendar(courseId); // calendar returns object
  const { calendarBlocks, startDate, endDate } = calendar;
  const contentObject = {
    announcements,
    calendarBlocks,
    instructors,
    modules,
    officeHours,
    sectionGroups
  };
  dispatch(setGeneralContent(contentObject));
  dispatch(setCourseDates(startDate, endDate));
  dispatch(loadAllSectionGroupInstructors(courseId, sectionGroups));
};

const setScheduleContent = contentObject => ({
  type: SET_SCHEDULE_CONTENT,
  activities: contentObject.activities,
  assignments: contentObject.assignments,
  lectureNotes: contentObject.lectureNotes,
  sections: contentObject.sections
});

const loadScheduleContent = courseId => async (dispatch) => {
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

// this one is the all mighty function, it loads - everything -
export const loadAllContent = courseId => async (dispatch) => {
  dispatch(loadSemesters());
  dispatch(loadGeneralContent(courseId));
  dispatch(loadScheduleContent(courseId));
};

// ====== Reload functions below, used for loading data after post calls ======

const setInstructors = instructors => ({
  type: SET_INSTRUCTORS,
  instructors
});

export const reloadInstructors = courseId => async (dispatch) => {
  const instructors = await loadInstructors(courseId);
  dispatch(setInstructors(instructors));
};

const setAnnouncements = announcements => ({
  type: SET_ANNOUNCEMENTS,
  announcements
});

export const reloadAnnouncements = courseId => async (dispatch) => {
  const announcements = await loadAnnouncements(courseId);
  dispatch(setAnnouncements(announcements));
};

const setMaterials = ({ assignments, activities, lectureNotes }) => ({
  type: SET_MATERIALS,
  assignments,
  activities,
  lectureNotes
});

export const reloadMaterials = courseId => async (dispatch) => {
  const lectureNotes = await loadLectureNotes(courseId);
  const assignments = await loadAssignments(courseId);
  const activities = await loadActivities(courseId);
  const contentObject = {
    assignments,
    activities,
    lectureNotes
  };
  dispatch(setMaterials(contentObject));
};

const setSections = sections => ({
  type: SET_SECTIONS,
  sections
});

export const reloadSections = courseId => async (dispatch) => {
  const sections = await loadSections(courseId);
  dispatch(setSections(sections));
};

const setModules = modules => ({
  type: SET_MODULES,
  modules
});

export const reloadModules = courseId => async (dispatch) => {
  const modules = await loadModules(courseId);
  dispatch(setModules(modules));
};
