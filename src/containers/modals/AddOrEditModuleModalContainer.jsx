import { connect } from 'react-redux';
import AddOrEditModuleModal from '../../components/Modals/AddOrEditModuleModal.jsx';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { reloadModules } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state)
});

const mapActionsToProps = ({
  reloadModules
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddOrEditModuleModal);
