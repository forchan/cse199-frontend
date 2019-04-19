/* Sg means section group
 *
 * There may be a much better way to combine all section group instructors into
 * one array, but this works for now as there will always be 6 section groups
 * named A through F
 */
export const getAllSectionInstructors = state => {
  const { A, B, C, D, E, F } = state.sectionInstructors;
  return [ ...A, ...B, ...C, ...D, ...E, ...F];
};
