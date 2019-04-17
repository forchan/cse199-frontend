import { LECTURE, RECITATION } from '../constants/ScheduleConstants.js';

// Lecture Sections
export const getLectureSectionIdToNameMap = state => {
  const idMap = new Map();
  state.content.sections.forEach(section => {
    if (section.section_type === LECTURE) {
      idMap.set(section.section_id, section.section_name);
    }
  });
  return idMap;
};

export const getLectureSectionNameToIdMap = state => {
  const nameMap = new Map();
  state.content.sections.forEach(section => {
    if (section.section_type === LECTURE) {
      nameMap.set(section.section_name, section.section_id);
    }
  });
  return nameMap;
};

// Recitation Sections
export const getRecitationSectionIdToNameMap = state => {
  const idMap = new Map();
  state.content.sections.forEach(section => {
    if (section.section_type === RECITATION) {
      idMap.set(section.section_id, section.section_name);
    }
  });
  return idMap;
};

export const getRecitationSectionNameToIdMap = state => {
  const nameMap = new Map();
  state.content.sections.forEach(section => {
    if (section.section_type === RECITATION) {
      nameMap.set(section.section_name, section.section_id);
    }
  });
  return nameMap;
};

// Section Groups
export const getSectionGroupIdToNameMap = state => {
  const idMap = new Map();
  state.content.sectionGroups.forEach(sectionGroup => {
    idMap.set(sectionGroup.sg_id, sectionGroup.section_group_name);
  });
  return idMap;
};

export const getSectionGroupNameToIdMap = state => {
  const nameMap = new Map();
  state.content.sectionGroups.forEach(sectionGroup => {
    nameMap.set(sectionGroup.section_group_name, sectionGroup.sg_id);
  });
  return nameMap;
};
