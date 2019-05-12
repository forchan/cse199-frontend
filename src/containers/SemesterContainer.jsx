import { connect } from 'react-redux';
import Semester from '../components/Semester.jsx';
import { getSemesters } from '../selectors/CourseSelectors.js';

const mapStateToProps = state => ({
  semesters: getSemesters(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Semester);
