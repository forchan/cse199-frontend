import { connect } from 'react-redux';
import CreateSemesterModal from '../../components/Modals/CreateSemesterModal.jsx';
import { getSemesters } from '../../selectors/CourseSelectors.js';
import { loadSemesters } from '../../actions/CourseActions.js';

const mapStateToProps = state => ({
  semesters: getSemesters(state)
});

const mapActionsToProps = ({
  loadSemesters
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CreateSemesterModal);
