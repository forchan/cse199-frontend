export const getSectionIdToNameMap = state => {
  const idMap = new Map();
  state.content.sections.forEach(section => {
    idMap.set(section.section_id, section.section_name);
  });
  return idMap;
};

export const getSectionNameToIdMap = state => {
  const nameMap = new Map();
  state.content.sections.forEach(section => {
    nameMap.set(section.section_name, section.section_id);
  });
  return nameMap;
};

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
