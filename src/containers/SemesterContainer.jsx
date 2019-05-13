import { connect } from 'react-redux';
import Semester from '../components/Semester.jsx';
import {
  getSemesters,
  getCourseId,
  getCourseYear,
  getCourseSemester
} from '../selectors/CourseSelectors.js';
import { setCourseDetails } from '../actions/CourseActions.js';
import { loadAllContent } from '../actions/ContentActions.js';

const mapStateToProps = state => ({
  semesters: getSemesters(state),
  courseId: getCourseId(state),
  courseYear: getCourseYear(state),
  courseSemester: getCourseSemester(state)
});

const mapActionsToProps = ({
  loadAllContent,
  setCourseDetails
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Semester);
