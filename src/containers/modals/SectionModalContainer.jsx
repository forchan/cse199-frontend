import { connect } from 'react-redux';
import SectionModal from '../../components/Modals/SectionModal.jsx';
import { getSections } from '../../selectors/ContentSelectors.js';
import { getCourseId } from '../../selectors/CourseSelectors.js';

const mapStateToProps = state => ({
  courseId: getCourseId(state),
  sections: getSections(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SectionModal);
