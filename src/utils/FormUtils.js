/* functions used to prepare forms to submit that match params passed to API */
import { DELETED } from '../constants/DeleteConstant.js';
import {
  ANNOUNCEMENT
} from '../constants/MaterialConstants.js';
import {
  ADD_INSTRUCTOR_TO_SECTION,
  ADD_INSTRUCTOR_TO_MODULE,
  ADD_MATERIAL_TO_MODULE,
  POST_INSTRUCTOR,
  POST_MATERIAL,
  POST_SECTION,
  DELETE_MATERIALS_FROM_MODULE,
  DELETE_INSTRUCTOR_FROM_SECTION
} from '../constants/ApiConstants.js';

/* ============================ Instructor Forms ============================ */

export const prepareAddOrEditInstructorForm = detailsObject => {
  // null instructor id passed in during add new
  const { title, firstName, lastName, type, email, photoURL, instructorId } = detailsObject;
  const formToSubmit = {
    action: POST_INSTRUCTOR,
    instructortype: type,
    instructortitle: title,
    instructorfirstname: firstName,
    instructorlastname: lastName,
    instructorcontact: email,
    instructorpicture: photoURL,
    instructorid: instructorId
  };
  return formToSubmit;
};

export const prepareDeleteInstructorForm = instructor => {
  const deletedInstructor = `${DELETED}${instructor.instructor_type}`;
  const formToSubmit = {
    action: POST_INSTRUCTOR,
    instructorid: instructor.instructor_id,
    instructortype: deletedInstructor,
    instructortitle: instructor.instructor_title,
    instructorfirstname: instructor.instructor_firstname,
    instructorlastname: instructor.instructor_lastname,
    instructorcontact: instructor.instructor_contact,
    instructorpicture: instructor.instructor_picture_url,
  };
  return formToSubmit;
};

/* ======================== Section Instructor Forms ======================== */

export const prepareAddInstructorToModuleForm = (instructorId, module) => {
  const formToSubmit = {
    action: ADD_INSTRUCTOR_TO_MODULE,
    courseid: module.course_id,
    modulename: module.text,
    instructorid: instructorId
  };
  return formToSubmit;
};

export const prepareAddInstructorToSectionForm = (instructorId, sectionId, startDate, endDate) => {
  const formToSubmit = {
    action: ADD_INSTRUCTOR_TO_SECTION,
    instructorid: instructorId,
    sectionid: sectionId,
    datestart: startDate,
    dateend: endDate
  };
  return formToSubmit;
}

export const prepareDeleteInstructorFromSectionForm = sectionInstructor => {
  const formToSubmit = {
    action: DELETE_INSTRUCTOR_FROM_SECTION,
    siid: sectionInstructor.si_id
  };
  return formToSubmit;
};


/* =========================== Announcement Forms =========================== */

export const prepareAddOrEditAnnouncementForm = detailsObject => {
  // null section group id, section id, and materials id passed in accordingly
  const { courseId, title, text, sectionId, sectionGroupId, materialsId } = detailsObject;
  const formToSubmit = {
    action: POST_MATERIAL,
    materialstype: ANNOUNCEMENT,
    materialsid: materialsId,
    courseid: courseId,
    sectionid: sectionId,
    sectiongroupid: sectionGroupId,
    title: title,
    text: text
  };
  return formToSubmit;
};

export const prepareDeleteAnnouncementForm = announcement => {
  const deletedAnnouncement = `${DELETED}${announcement.materials_type}`;
  const formToSubmit = {
    action: POST_MATERIAL,
    materialstype: deletedAnnouncement,
    materialsid: announcement.materials_id,
    courseid: announcement.course_id,
    sectionid: announcement.section_id,
    sectiongroupid: announcement.section_group_id,
    title: announcement.title,
    text: announcement.text
  };
  return formToSubmit;
};

/* ============================= Material Forms ============================= */

// assignments, activities, and lecture notes
export const prepareAddMaterialToModuleForm = detailsObject => {
  const formToSubmit = {
    action: ADD_MATERIAL_TO_MODULE,
    courseid: detailsObject.courseId,
    modulename: detailsObject.moduleName,
    materialstype: detailsObject.materialType,
    title: detailsObject.materialTitle,
    url: detailsObject.materialURL,
    text: detailsObject.materialText,
    description: detailsObject.materialDescription,
    materialsformat: detailsObject.materialFormat,
    duedate: detailsObject.materialDueDate
  };
  return formToSubmit;
};

export const prepareDeleteMaterialsFromModuleForm = detailsObject => {
  const formToSubmit = {
    action: DELETE_MATERIALS_FROM_MODULE,
    modulename: detailsObject.moduleName,
    courseid: detailsObject.courseId,
    title: detailsObject.materialTitle,
    materialstype: detailsObject.materialType
  };
  return formToSubmit;
};

/* ============================= Section Forms ============================== */

export const prepareAddOrEditSectionForm = detailsObject => {
  const formToSubmit = {
    action: POST_SECTION,
    courseid: detailsObject.courseId,
    sectionid: detailsObject.sectionId,
  	sectionname: detailsObject.sectionName,
  	sectionschedule: detailsObject.sectionSchedule,
  	sectiontime: detailsObject.sectionTime,
  	sectiontype: detailsObject.sectionType,
  	sectionlocation: detailsObject.sectionLocation,
  	sectiongroupid: detailsObject.sectionGroupId
  };
  return formToSubmit;
};

export const prepareDeleteSectionForm = section => {
  const deletedSection = `${DELETED}${section.section_type}`
  const formToSubmit = {
    action: POST_SECTION,
    courseid: section.course_id,
    sectionid: section.section_id,
  	sectionname: section.section_name,
  	sectionschedule: section.section_schedule,
  	sectiontime: section.section_time,
  	sectiontype: deletedSection,
  	sectionlocation: section.section_location,
  };
  return formToSubmit;
};
