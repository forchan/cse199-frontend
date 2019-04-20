import { connect } from 'react-redux';
import AddOrEditAnnouncementModal from '../../components/Modals/AddOrEditAnnouncementModal.jsx';
import {
  getSections,
  getSectionGroups,
  getLectureSectionNameToIdMap,
  getSectionGroupNameToIdMap
} from '../../selectors/ContentSelectors.js';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { reloadAnnouncements } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state),
  sections: getSections(state),
  sectionGroups: getSectionGroups(state),
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
