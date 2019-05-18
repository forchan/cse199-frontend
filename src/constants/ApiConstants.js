export const BASE_URL = 'http://www-student.cse.buffalo.edu/CSE199/admin';
const API_BASE_URL = `${BASE_URL}/api`;

// API endpoints
export const API_VIEW_URL = `${API_BASE_URL}/viewcontroller.php`;
export const API_INSTRUCTOR_URL = `${API_BASE_URL}/instructorcontroller.php`;
export const API_MATERIAL_URL = `${API_BASE_URL}/materialcontroller.php`;
export const API_SECTION_URL = `${API_BASE_URL}/sectioncontroller.php`;

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
export const GET_COURSE_INSTRUCTORS = 'getCourseInstructors';
export const GET_COURSE_LIST = 'getCourseList';

// POST related constants
export const POST_INSTRUCTOR = 'addOrEditInstructor';
export const POST_MATERIAL = 'addOrEditMaterials';
export const POST_SECTION = 'addOrEditSection';

// ADD only related constants
export const ADD_INSTRUCTOR_TO_MODULE = 'addInstructorToModule';
export const ADD_INSTRUCTOR_TO_SECTION = 'addInstructorToSection';
export const ADD_MATERIAL_TO_MODULE = 'addMaterialsToModule';
export const ADD_MODULE = 'addModule';
export const CREATE_SEMESTER_AND_DETAILS = 'createCourseAndCalendarAndSectionGroups';

// DELETE related constants
export const DELETE_MATERIALS_FROM_MODULE = 'deleteMaterialsFromModule';
export const DELETE_INSTRUCTOR_FROM_SECTION = 'deleteInstructorFromSection';
