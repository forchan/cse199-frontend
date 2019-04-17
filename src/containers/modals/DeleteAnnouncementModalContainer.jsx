import { connect } from 'react-redux';
import DeleteAnnouncementModal from '../../components/Modals/DeleteAnnouncementModal.jsx';
import { reloadAnnouncements } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: state.course.courseId,
});

const mapActionsToProps = ({
  reloadAnnouncements
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteAnnouncementModal);
