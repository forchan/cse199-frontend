import { connect } from 'react-redux';
import AddOrEditAnnouncementModal from '../../components/Modals/AddOrEditAnnouncementModal.jsx';
import {
  getLectureSectionNameToIdMap,
  getSectionGroupNameToIdMap
} from '../../selectors/ContentSelectors.js';
import { reloadAnnouncements } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: state.course.courseId,
  sections: state.content.sections,
  sectionGroups: state.content.sectionGroups,
  lectureSectionNameToIdMap: getLectureSectionNameToIdMap(state),
  sectionGroupNameToIdMap: getSectionGroupNameToIdMap(state)
});

const mapActionsToProps = ({
  reloadAnnouncements
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddOrEditAnnouncementModal);