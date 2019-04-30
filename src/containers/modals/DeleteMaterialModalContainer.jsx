import { connect } from 'react-redux';
import DeleteMaterialModal from '../../components/Modals/DeleteMaterialModal.jsx';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { reloadMaterials } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state)
});

const mapActionsToProps = ({
  reloadMaterials
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteMaterialModal);
