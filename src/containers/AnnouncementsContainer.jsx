import { connect } from 'react-redux';
import Announcements from '../components/Announcements.jsx';
import {
  getSectionIdToNameMap,
  getSectionGroupIdToNameMap
} from '../selectors/ContentSelectors.js';

const mapStateToProps = state => ({
  announcements: state.content.announcements,
  sectionIdToNameMap: getSectionIdToNameMap(state),
  sectionGroupIdToNameMap: getSectionGroupIdToNameMap(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Announcements);
