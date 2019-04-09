/* Have not figured out a way to cleanly extract all property types from
 * multiple different API responses yet. Such as data.instructors or
 * data.officehours.
 *
 * Therefore, these helper functions assist ApiUtils.js, mainly for GET calls
 */
import { getStuff } from './ApiUtils.js';
import {
  GET_ANNOUNCEMENTS,
  GET_ACTIVITIES,
  GET_ASSIGNMENTS,
  GET_CALENDAR,
  GET_COURSE_AND_SECTIONS,
  GET_INSTRUCTOR_LIST,
  GET_MODULES,
  GET_OFFICE_HOURS,
  GET_LECTURE_NOTES,
  GET_SECTION_GROUPS
} from '../constants/ApiConstants.js';

export const loadActivities = async (courseId) => {
  let { data } = await getStuff({ action: GET_ACTIVITIES, courseId: courseId });
  return (data) ? data.activities : [];
}

export const loadAnnouncements = async (courseId) => {
  let { data } = await getStuff({ action: GET_ANNOUNCEMENTS, courseId: courseId });
  return (data) ? data.announcements.reverse() : []; // most recent first
}

export const loadAssignments = async (courseId) => {
  let { data } = await getStuff({ action: GET_ASSIGNMENTS, courseId: courseId });
  return (data) ? data.assignments : [];
}

export const loadCalendar = async (courseId) => {
  const { data } = await getStuff({ action: GET_CALENDAR, courseId: courseId });
  let calendar = [];
  if (data) {
    for (let num = 1; num <= 7; num++) { // need to extract block values from json
      let targetBlock = "block_" + num;
      calendar.push(data[targetBlock][0]);
    }
  }
  return calendar;
}

export const loadInstructors = async () => {
  let { data } = await getStuff({ action: GET_INSTRUCTOR_LIST });
  return (data) ? data.instructors : [];
}

export const loadLectureNotes = async (courseId) => {
  let { data } = await getStuff({ action: GET_LECTURE_NOTES, courseId: courseId });
  return (data) ? data.lectureNotes : [];
}

export const loadModules = async (courseId) => {
  const { data } = await getStuff({ action: GET_MODULES, courseId: courseId });
  return (data) ? data.modules : [];
}

export const loadOfficeHours = async (courseId) => {
  let { data } = await getStuff({ action: GET_OFFICE_HOURS, courseId: courseId });
  return (data) ? data.officehours : [];
}

export const loadSections = async (courseId) => {
  const { data } = await getStuff({ action: GET_COURSE_AND_SECTIONS, courseId: courseId });
  return (data) ? data.sections : [];
}

export const loadSectionGroups = async (courseId) => {
  const { data } = await getStuff({ action: GET_SECTION_GROUPS, courseId: courseId });
  return (data) ? data.section_groups : [];
}
