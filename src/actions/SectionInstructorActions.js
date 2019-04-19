/* Section group / or course instructors are the instructors that are tied to
 * lecture and recitation sections. Each section group between A - F will have
 * these instructors, so they will will be stored as:
 * "section group name" : "section group lec/rec instructors"
 * ex. A: [array of instructors]
 *
 * Note: General instructors that are NOT tied to a courseId are loaded in
 * ContentActions.
 */
import { loadCourseInstructors } from '../utils/ApiHelperUtils.js';
export const SET_SECTION_GROUP_INSTRUCTORS = '#setSectionInstructors';

const setSectionGroupInstructors = (sectionGroupName, sectionGroupInstructors) => async (dispatch) => ({
  type: SET_SECTION_GROUP_INSTRUCTORS,
  sectionGroupName,
  sectionGroupInstructors
});

const loadInstructorsBySectionGroup = (courseId, sectionGroupId, sectionGroupName) => async (dispatch) => {
  const sectionGroupInstructors = await loadCourseInstructors(courseId, sectionGroupId);
  dispatch(setSectionGroupInstructors(sectionGroupName, sectionGroupInstructors));
};

export const loadAllSectionGroupInstructors = (courseId, sectionGroups) => async (dispatch) => {
  sectionGroups.forEach(sectionGroup => {
    dispatch(loadInstructorsBySectionGroup(courseId, sectionGroup.sg_id, sectionGroup.section_group_name));
  });
};
