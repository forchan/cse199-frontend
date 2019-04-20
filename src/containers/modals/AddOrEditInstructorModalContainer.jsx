import { connect } from 'react-redux';
import AddOrEditInstructorModal from '../../components/Modals/AddOrEditInstructorModal.jsx';
import { getInstructors } from '../../selectors/ContentSelectors.js';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { reloadInstructors } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state),
  currentInstructors: getInstructors(state)
});

const mapActionsToProps = ({
  reloadInstructors
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddOrEditInstructorModal);
