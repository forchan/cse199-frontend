export const BASE_URL = 'http://www-student.cse.buffalo.edu/CSE199/admin';
const API_BASE_URL = `${BASE_URL}/api`;

// API endpoints
export const API_VIEW_URL = `${API_BASE_URL}/viewcontroller.php`;
export const API_INSTRUCTOR_URL = `${API_BASE_URL}/instructorcontroller.php`;

// GET related constants
export const GET_ANNOUNCEMENTS = 'getAnnouncement';
export const GET_ACTIVITIES = 'getActivities';
export const GET_ASSIGNMENTS = 'getAssignments';
export const GET_CALENDAR = 'getCalendar';
export const GET_INSTRUCTOR_LIST = 'getInstructorList';
export const GET_MODULE_INSTRUCTORS = 'getCourseInstructors';
export const GET_MODULES = 'getModules';
export const GET_OFFICE_HOURS = 'getOfficeHours';
export const GET_LECTURE_NOTES = 'getLectureNotes';
export const GET_COURSE_AND_SECTIONS = 'getCourse';
export const GET_SECTION_GROUPS = 'getSectionGroups';

// POST related constants
export const POST_INSTRUCTOR = 'addOrEditInstructor';
