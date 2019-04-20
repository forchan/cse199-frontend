import { connect } from 'react-redux';
import AddStaffToModuleModal from '../../components/Modals/AddStaffToModuleModal.jsx';
import { getInstructors } from '../../selectors/ContentSelectors.js';

const mapStateToProps = state => ({
  instructors: getInstructors(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddStaffToModuleModal);
