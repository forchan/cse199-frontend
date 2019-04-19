import { connect } from 'react-redux';
import RecitationStaffModal from '../../components/Modals/RecitationStaffModal.jsx';
import { getAllSectionInstructors } from '../../selectors/SectionInstructorSelectors.js';
import { getSectionGroupNameToIdMap } from '../../selectors/ContentSelectors.js';

const mapStateToProps = state => ({
  allSectionInstructors: getAllSectionInstructors(state),
  sectionGroupNameToIdMap: getSectionGroupNameToIdMap(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(RecitationStaffModal);
