import { connect } from 'react-redux';
import App from '../components/App.jsx';
import { loadAllContent } from '../actions/ContentActions.js';
import { setCourseDetails } from '../actions/CourseActions.js';
import {
  getCourseSemester,
  getCourseYear
} from '../selectors/CourseSelectors.js';

const mapStateToProps = state => ({
  courseSemester: getCourseSemester(state),
  courseYear: getCourseYear(state)
});

const mapActionsToProps = ({
  loadAllContent,
  setCourseDetails
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
