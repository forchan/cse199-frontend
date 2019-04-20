import { connect } from 'react-redux';
import DeleteAnnouncementModal from '../../components/Modals/DeleteAnnouncementModal.jsx';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { reloadAnnouncements } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state),
});

const mapActionsToProps = ({
  reloadAnnouncements
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteAnnouncementModal);
