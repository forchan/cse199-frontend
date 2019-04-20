/* Have not figured out a way to cleanly extract all property types from
 * multiple different API responses yet. Such as data.instructors or
 * data.officehours.
 *
 * Therefore, these helper functions assist ApiUtils.js, mainly for GET calls
 */
import { getApiStuff } from './ApiUtils.js';
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
  GET_SECTION_GROUPS,
  GET_COURSE_INSTRUCTORS
} from '../constants/ApiConstants.js';

export const loadActivities = async (courseId) => {
  let { data } = await getApiStuff({
    action: GET_ACTIVITIES,
    courseId: courseId
  });
  return (data && data.activities) ? data.activities : [];
};

export const loadAnnouncements = async (courseId) => {
  let { data } = await getApiStuff({
    action: GET_ANNOUNCEMENTS,
    courseId: courseId
  });
  return (data && data.announcements)
    ? data.announcements.reverse() // to get most recent first
    : [];
};

export const loadAssignments = async (courseId) => {
  let { data } = await getApiStuff({
    action: GET_ASSIGNMENTS,
    courseId: courseId
  });
  return (data && data.assignments) ? data.assignments : [];
};

export const loadCalendar = async (courseId) => {
  const { data } = await getApiStuff({
    action: GET_CALENDAR,
    courseId: courseId
  });
  if (!data) return [];

  let calendarBlocks = [];
  let calendarStartDate = '';
  let calendarEndDate = '';

  if (data) {
    for (let num = 1; num <= 7; num++) {
      let targetBlock = "block_" + num; // need to extract block values from json
      calendarBlocks.push(data[targetBlock][0]);
    }
    calendarStartDate = data.calendar_start;
    calendarEndDate = data.calendar_end;
  }
  const calendar = {
    startDate: calendarStartDate,
    endDate: calendarEndDate,
    calendarBlocks
  };
  return calendar;
};

export const loadInstructors = async () => {
  let { data } = await getApiStuff({
    action: GET_INSTRUCTOR_LIST
  });
  return (data && data.instructors) ? data.instructors : [];
};

export const loadLectureNotes = async (courseId) => {
  let { data } = await getApiStuff({
    action: GET_LECTURE_NOTES,
    courseId: courseId
  });
  return (data && data.lectureNotes) ? data.lectureNotes : [];
};

export const loadModules = async (courseId) => {
  const { data } = await getApiStuff({
    action: GET_MODULES,
    courseId: courseId
  });
  if (data && data.modules && data.modules.length >= 38) {
    console.log('Api recieved more than 37 modules, max should be 37.');
  }
  return (data && data.modules) ? data.modules : [];
};

export const loadOfficeHours = async (courseId) => {
  let { data } = await getApiStuff({
    action: GET_OFFICE_HOURS,
    courseId: courseId
  });
  return (data && data.officehours) ? data.officehours : [];
};

export const loadSections = async (courseId) => {
  const { data } = await getApiStuff({
    action: GET_COURSE_AND_SECTIONS,
    courseId: courseId
  });
  return (data && data.sections) ? data.sections : [];
};

export const loadSectionGroups = async (courseId) => {
  const { data } = await getApiStuff({
    action: GET_SECTION_GROUPS,
    courseId: courseId
  });
  return (data && data.section_groups) ? data.section_groups : [];
};

export const loadCourseInstructors = async (courseId, sectionGroupId) => {
  const { data } = await getApiStuff({
    action: GET_COURSE_INSTRUCTORS,
    courseId: courseId,
    sectionGroupId: sectionGroupId
  });
  return (data && data.instructors) ? data.instructors : [];
};
