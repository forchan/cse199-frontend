import { connect } from 'react-redux';
import SendAnnouncementModal from '../../components/Modals/SendAnnouncementModal.jsx';

const mapStateToProps = state => ({
  sections: state.content.sections,
  sectionGroups: state.content.sectionGroups
});

const mapActionsToProps = ({

});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SendAnnouncementModal);
