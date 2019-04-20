import { connect } from 'react-redux';
import App from '../components/App.jsx';
import { loadAllContent } from '../actions/ContentActions.js';
import {
  getCourseId,
  getCourseSemester,
  getCourseYear
} from '../selectors/CourseSelectors.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state),
  courseSemester: getCourseSemester(state),
  courseYear: getCourseYear(state)
});

const mapActionsToProps = ({
  loadAllContent
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
