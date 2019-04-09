import { getStuff } from '../utils/ApiUtils.js';
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

export const SET_GENERAL_CONTENT = '#loadGeneralContent';
export const SET_SCHEDULE_CONTENT = '#loadScheduleContent';

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
  activites: contentObject.activities,
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
