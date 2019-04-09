import { connect } from 'react-redux';
import Schedule from '../components/Schedule.jsx';

const mapStateToProps = state => ({
  calendar: state.content.calendar,
  modules: state.content.modules,
  sections: state.content.sections,
  activities: state.content.activities,
  assignments: state.content.assignments,
  lectureNotes: state.content.lectureNotes,
  sectionGroups: state.content.sectionGroups
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Schedule);
