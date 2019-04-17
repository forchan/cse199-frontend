/* functions used to prepare forms to submit that match params passed to API */
import { DELETED } from '../constants/DeleteConstant.js';
import {
  ANNOUNCEMENT
} from '../constants/MaterialConstants.js';
import {
  POST_INSTRUCTOR,
  POST_MATERIAL
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
