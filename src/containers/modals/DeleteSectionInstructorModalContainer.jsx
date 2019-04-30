import { connect } from 'react-redux';
import DeleteSectionInstructorModal from '../../components/Modals/DeleteSectionInstructorModal.jsx';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { getSectionGroups } from '../../selectors/ContentSelectors.js';
import { loadAllSectionGroupInstructors } from '../../actions/SectionInstructorActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state),
  sectionGroups: getSectionGroups(state),
});

const mapActionsToProps = ({
  loadAllSectionGroupInstructors
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteSectionInstructorModal);
