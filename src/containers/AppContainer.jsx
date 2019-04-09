import { connect } from 'react-redux';
import App from '../components/App.jsx';
import {
  loadGeneralContent,
  loadScheduleContent
} from '../actions/ContentActions.js';

const mapStateToProps = state => ({
  course: state.course,
  content: state.content
});

const mapActionsToProps = ({
  loadGeneralContent,
  loadScheduleContent
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
