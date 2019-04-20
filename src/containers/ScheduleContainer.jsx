import { connect } from 'react-redux';
import Schedule from '../components/Schedule.jsx';
import {
  getActivities,
  getAssignments,
  getCalendarBlocks,
  getLectureNotes,
  getModules,
  getSectionGroups
} from '../selectors/ContentSelectors.js';

const mapStateToProps = state => ({
  activities: getActivities(state),
  assignments: getAssignments(state),
  calendarBlocks: getCalendarBlocks(state),
  lectureNotes: getLectureNotes(state),
  modules: getModules(state),
  sectionGroups: getSectionGroups(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Schedule);
