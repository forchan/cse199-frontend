import { connect } from 'react-redux';
import CreateSemesterModal from '../../components/Modals/CreateSemesterModal.jsx';
import { getSemesters } from '../../selectors/CourseSelectors.js';

const mapStateToProps = state => ({
  semesters: getSemesters(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CreateSemesterModal);
