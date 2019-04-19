export const filterInstructorsBySectionAndSectionGroup = (
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
