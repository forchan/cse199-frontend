import { connect } from 'react-redux';
import AddOrEditInstructorModal from '../../components/Modals/AddOrEditInstructorModal.jsx';
import { reloadInstructors } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: state.course.courseId,
  currentInstructors: state.content.instructors
});

const mapActionsToProps = ({
  reloadInstructors
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddOrEditInstructorModal);
