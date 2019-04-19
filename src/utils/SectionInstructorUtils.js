/* ============================ Recitation Staff ============================= */

const filterInstructorsBySectionAndSectionGroup = (
  instructors,
  sectionId,
  sectionGroupId
) => {
  const filteredInstructors = instructors.filter(instructor => (
    instructor.sg_id === sectionGroupId
    && instructor.section_id === sectionId
  ));
  return filteredInstructors;
};

export const getRecitationStaff = (
  instructors,
  sectionId,
  sectionGroupId
) => {
  const recitationStaff = filterInstructorsBySectionAndSectionGroup(
    instructors,
    sectionId,
    sectionGroupId
  );
  return recitationStaff;
};

/* ============================= Lecture Staff ============================== */

const filterInstructorsBySectionGroupAndDates = (
  instructors,
  sectionGroupId,
  startDate,
  endDate
) => {
  const filteredInstructors = instructors.filter(instructor => (
    instructor.sg_id === sectionGroupId
    && instructor.date_start === startDate
    && instructor.date_end === endDate
  ));
  return filteredInstructors;
};

const filterDuplicateInstructorsById = instructors => {
  let seen = {};
  const filteredInstructors = instructors.filter(instructor => (
    !seen[instructor.instructor_id] && (seen[instructor.instructor_id] = true)
  ));
  return filteredInstructors;
};

export const getLectureStaff = (
  instructors,
  sectionGroupId,
  startDate,
  endDate
) => {
  const staffWithDuplicates = filterInstructorsBySectionGroupAndDates(
    instructors,
    sectionGroupId,
    startDate,
    endDate
  );
  const staffWithoutDuplicates = filterDuplicateInstructorsById(staffWithDuplicates);
  return staffWithoutDuplicates;
};
