import { DELETED } from '../constants/DeleteConstant.js';
import {
  POST_INSTRUCTOR
} from '../constants/ApiConstants.js';

/* ============================ Instructor Forms ============================ */

export const prepareAddOrEditInstructorForm = detailsObject => {
  const {
    title,
    firstName,
    lastName,
    type,
    email,
    photoURL,
    edit,
    instructorId
  } = detailsObject;
  const formToSubmit = {
    action: POST_INSTRUCTOR,
    instructortype: type,
    instructortitle: title,
    instructorfirstname: firstName,
    instructorlastname: lastName,
    instructorcontact: email,
    instructorpicture: photoURL,
  };
  if (edit) {
    formToSubmit['instructorid'] = instructorId;
  }
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
