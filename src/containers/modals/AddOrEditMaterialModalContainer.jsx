import { connect } from 'react-redux';
import AddOrEditMaterialModal from '../../components/Modals/AddOrEditMaterialModal.jsx';
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
)(AddOrEditMaterialModal);
