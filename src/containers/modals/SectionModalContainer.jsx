import { connect } from 'react-redux';
import SectionModal from '../../components/Modals/SectionModal.jsx';

const mapStateToProps = state => ({
  courseId: state.course.courseId,
  sections: state.content.sections,
  startDate: state.course.startDate,
  endDate: state.course.endDate,
  calendarBlocks: state.content.calendarBlocks
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SectionModal);
