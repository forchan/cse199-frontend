import { connect } from 'react-redux';
import Team from '../components/Team.jsx';
import { reloadInstructors } from '../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: state.course.courseId,
  instructors: state.content.instructors,
  officeHours: state.content.officeHours
});

const mapActionsToProps = ({
  reloadInstructors
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Team);
