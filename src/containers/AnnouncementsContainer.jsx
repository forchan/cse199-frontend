import { connect } from 'react-redux';
import Announcements from '../components/Announcements.jsx';

const mapStateToProps = state => ({
  announcements: state.content.announcements
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Announcements);
