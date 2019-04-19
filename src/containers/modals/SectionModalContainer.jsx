import { connect } from 'react-redux';
import SectionModal from '../../components/Modals/SectionModal.jsx';

const mapStateToProps = state => ({
  courseId: state.course.courseId,
  sections: state.content.sections
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SectionModal);
