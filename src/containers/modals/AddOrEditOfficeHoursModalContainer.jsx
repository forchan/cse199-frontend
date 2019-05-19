import { connect } from 'react-redux';
import AddOrEditOfficeHoursModal from '../../components/Modals/AddOrEditOfficeHoursModal.jsx';
import { getCourseId } from '../../selectors/CourseSelectors.js';
import { reloadOfficeHours } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state)
});

const mapActionsToProps = ({
  reloadOfficeHours
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddOrEditOfficeHoursModal);
