import { connect } from 'react-redux';
import DeleteInstructorModal from '../../components/Modals/DeleteInstructorModal.jsx';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { reloadInstructors } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state),
});

const mapActionsToProps = ({
  reloadInstructors
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteInstructorModal);
