import { connect } from 'react-redux';
import SendAnnouncementModal from '../../components/Modals/SendAnnouncementModal.jsx';
import {
  getLectureSectionNameToIdMap,
  getSectionGroupNameToIdMap
} from '../../selectors/ContentSelectors.js';

const mapStateToProps = state => ({
  sections: state.content.sections,
  sectionGroups: state.content.sectionGroups,
  lectureSectionNameToIdMap: getLectureSectionNameToIdMap(state),
  sectionGroupNameToIdMap: getSectionGroupNameToIdMap(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SendAnnouncementModal);
