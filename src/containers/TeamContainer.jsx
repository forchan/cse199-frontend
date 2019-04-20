import { connect } from 'react-redux';
import Team from '../components/Team.jsx';
import { getInstructors, getOfficeHours } from '../selectors/ContentSelectors.js';

const mapStateToProps = state => ({
  instructors: getInstructors(state),
  officeHours: getOfficeHours(state)
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Team);
