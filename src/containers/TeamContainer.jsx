import { connect } from 'react-redux';
import Team from '../components/Team.jsx';

const mapStateToProps = state => ({
  instructors: state.content.instructors,
  officeHours: state.content.officeHours
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Team);
