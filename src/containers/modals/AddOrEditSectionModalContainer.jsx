import { connect } from 'react-redux';
import AddOrEditSectionModal from '../../components/Modals/AddOrEditSectionModal.jsx';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { reloadSections } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state)
});

const mapActionsToProps = ({
  reloadSections
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddOrEditSectionModal);
