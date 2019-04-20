import { connect } from 'react-redux';
import Announcements from '../components/Announcements.jsx';
import {
  getAnnouncements,
  getLectureSectionIdToNameMap,
  getSectionGroupIdToNameMap
} from '../selectors/ContentSelectors.js';

const mapStateToProps = state => ({
  announcements: getAnnouncements(state),
  lectureSectionIdToNameMap: getLectureSectionIdToNameMap(state),
  sectionGroupIdToNameMap: getSectionGroupIdToNameMap(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Announcements);
