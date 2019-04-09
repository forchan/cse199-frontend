import { connect } from 'react-redux';
import Schedule from '../components/Schedule.jsx';

const mapStateToProps = state => ({
  state: state.content
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Schedule);
