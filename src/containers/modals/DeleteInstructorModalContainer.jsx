import { connect } from 'react-redux';
import DeleteInstructorModal from '../../components/Modals/DeleteInstructorModal.jsx';
import { reloadInstructors } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: state.course.courseId,
});

const mapActionsToProps = ({
  reloadInstructors
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteInstructorModal);