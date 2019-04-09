import { connect } from 'react-redux';
import App from '../components/App.jsx';
import {
  loadGeneralContent,
  loadScheduleContent
} from '../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: state.course.courseId,
  courseSemester: state.course.courseSemester,
  courseYear: state.course.courseYear
});

const mapActionsToProps = ({
  loadGeneralContent,
  loadScheduleContent
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
