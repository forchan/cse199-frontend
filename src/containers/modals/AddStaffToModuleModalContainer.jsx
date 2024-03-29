import { connect } from 'react-redux';
import AddStaffToModuleModal from '../../components/Modals/AddStaffToModuleModal.jsx';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { getInstructors, getSectionGroups } from '../../selectors/ContentSelectors.js';
import { loadAllSectionGroupInstructors } from '../../actions/SectionInstructorActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state),
  sectionGroups: getSectionGroups(state),
  instructors: getInstructors(state)
});

const mapActionsToProps = ({
  loadAllSectionGroupInstructors
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddStaffToModuleModal);
