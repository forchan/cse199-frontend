import { connect } from 'react-redux';
import App from '../components/App.jsx';
import {
  loadAllContent
} from '../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: state.course.courseId,
  courseSemester: state.course.courseSemester,
  courseYear: state.course.courseYear
});

const mapActionsToProps = ({
  loadAllContent
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
