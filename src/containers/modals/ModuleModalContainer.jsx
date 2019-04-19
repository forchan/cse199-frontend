import { connect } from 'react-redux';
import ModuleModal from '../../components/Modals/ModuleModal.jsx';
import { getSectionGroupNameToIdMap } from '../../selectors/ContentSelectors.js';
import { getAllSectionInstructors } from '../../selectors/SectionInstructorSelectors.js';

const mapStateToProps = state => ({
  allSectionInstructors: getAllSectionInstructors(state),
  sectionGroupNameToIdMap: getSectionGroupNameToIdMap(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ModuleModal);
