import { connect } from 'react-redux';
import App from '../components/App.jsx';
import { loadAllContent } from '../actions/ContentActions.js';
import { setCourseDetails } from '../actions/CourseActions.js';

const mapStateToProps = state => ({

});

const mapActionsToProps = ({
  loadAllContent,
  setCourseDetails
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
