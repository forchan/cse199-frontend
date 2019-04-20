import { INTRO_MODULE } from '../constants/ScheduleConstants.js';

export const prettyFormatDate = (dateString) => { // yyyy-mm-dd to mm-dd or m-dd
  if (dateString === undefined) return "";
  let monthStartIndex = (dateString.charAt(5) === '0') ? 6 : 5; // m vs. mm

  return dateString.substring(monthStartIndex).replace(/-/g, '/');
};
/* calendarMap uses "start date : end date" as key and block number as value
 * moduleMap uses "section group id : calendar block number" as key and
 * module name as value
 *
 * note: the key pairs are seperate by ":" as a separator
 */
export const joinValuesAsKey = (value1, value2) => {
  let keyContent = [ value1, value2 ];
  return keyContent.join(':');
};
/* calendarMap uses key as "start date : end date" joined together using
 * joinValuesAsKey and the corresponding calendar block number as value
 */
export const configureCalendarMap = (calendar) => {
  let calendarMap = new Map();
  let blockNumber = 0;
  calendar.forEach((block) => {
    let key = joinValuesAsKey(block.start, block.end);
    calendarMap.set(key, blockNumber++);
  });
  return calendarMap;
};
/* moduleMap uses key as "section group id : calendar block number"
 * and the corresponding module as value
 */
export const configureModuleMap = (modules, calendarMap) => {
  let moduleMap = new Map();
  modules.forEach((module) => {
    if (module.section_group_id === null) {
      moduleMap.set(INTRO_MODULE, module);
      return;
    }
    let moduleSectionGroup = module.section_group_id;
    let calendarKey = joinValuesAsKey(module.date_start, module.date_end);
    let calendarBlockNumber = calendarMap.get(calendarKey)
    let moduleKey = joinValuesAsKey(moduleSectionGroup, calendarBlockNumber);
    moduleMap.set(moduleKey, module);
  });
  return moduleMap;
};
