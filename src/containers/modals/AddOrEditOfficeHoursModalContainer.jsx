import { connect } from 'react-redux';
import AddOrEditOfficeHoursModal from '../../components/Modals/AddOrEditOfficeHoursModal.jsx';
import { getCourseId, getCourseSemester, getCourseYear } from '../../selectors/CourseSelectors.js';
import { reloadOfficeHours } from '../../actions/ContentActions.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state),
  courseYear: getCourseYear(state),
  courseSemester: getCourseSemester(state)
});

const mapActionsToProps = ({
  reloadOfficeHours
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddOrEditOfficeHoursModal);
