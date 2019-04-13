import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardColumns
} from 'reactstrap';
import classnames from 'classnames';
import InstructorCard from './Cards/InstructorCard.jsx';
import AddOrEditInstructorModal from './Modals/AddOrEditInstructorModal.jsx';

const propTypes = {
  courseId: PropTypes.string.isRequired,
  instructors: PropTypes.array.isRequired,
  officeHours: PropTypes.array.isRequired,
  reloadInstructors: PropTypes.func.isRequired
};

class Team extends Component {
// const Team = ({ instructors, officeHours, courseId, reloadInstructors }) => {
//   const [addOrEditInstructorModal, setModal] = useState(false);
//   const [editOption, setEditOption] = useState(false);
//   const [instructorToEdit, setInstructorToEdit] = useState({});
//   const [activeTab, setTab] = useState('1');
//
//   const toggleEditOption = () => setEditOption(!editOption);
//   const toggleModal = () => setModal(!addOrEditInstructorModal);
//   const toggleModalWithEdit = async (instructor) => {
//     await toggleEditOption();
//     await setInstructorToEdit(instructor);
//     toggleModal();
//   };
//   const closeModal = () => {
//     toggleModal();
//     if (editOption !== false) {
//       setEditOption(false);
//       setInstructorToEdit({});
//     }
//   };
//   const toggleTab = tab => {
//     if (activeTab !== tab) {
//       setTab(tab);
//     }
//   };
  state = {
    addOrEditInstructorModal: false,
    editOption: false,
    instructorToEdit: undefined,
    activeTab: '1'
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  toggleModalWithEdit = instructor => {
    this.setState({
      editOption: true,
      addOrEditInstructorModal: true,
      instructorToEdit: instructor
    });
  }

  toggleModal = () => {
    this.setState(prevState => ({
      addOrEditInstructorModal: !prevState.addOrEditInstructorModal
    }));
  }

  closeModal = () => {
    this.setState({
      editOption: false,
      addOrEditInstructorModal: false,
      instructorToEdit: undefined
    });
  }

  render() {
    const { instructors, officeHours, courseId, reloadInstructors } = this.props;
    const { addOrEditInstructorModal, editOption, instructorToEdit, activeTab } = this.state;
    const officeHourMap = new Map();
    const instructorCards = [];
    const taCards = [];

    officeHours.forEach((officeHour) => {
      officeHourMap.set(officeHour.instructor_id, officeHour);
    });

    instructors.forEach((instructor) => {
      if (instructor.instructor_type !== 'INSTRUCTOR') {
        taCards.push(
          <InstructorCard
            key={instructor.instructor_id}
            instructor={instructor}
            officeHour={officeHourMap.get(instructor.instructor_id)}
            toggleEdit={this.toggleModalWithEdit}
          />
        );
      } else {
        instructorCards.push(
          <InstructorCard
            key={instructor.instructor_id}
            instructor={instructor}
            officeHour={officeHourMap.get(instructor.instructor_id)}
            toggleEdit={this.toggleModalWithEdit}
          />
        );
      }
    });

    return (
      <div className="content">
        <AddOrEditInstructorModal
          isOpen={addOrEditInstructorModal}
          toggle={this.closeModal}
          courseId={courseId}
          reloadInstructors={reloadInstructors}
          edit={editOption}
          instructor={instructorToEdit}
        />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => this.toggleTab('1')}
            >
              Instructors
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => this.toggleTab('2')}
            >
              Teaching Assistants
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={this.toggleModal}
            >
              Add New{' '}
              <span data-notify="icon" className="nc-icon nc-user-run" />
            </NavLink>
          </NavItem>
        </Nav>
        &nbsp;
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <CardColumns>
              {instructorCards}
            </CardColumns>
          </TabPane>
          <TabPane tabId="2">
            <CardColumns>
              {taCards}
            </CardColumns>
          </TabPane>
          <TabPane tabId="3">
            This message is hidden lol.
          </TabPane>
        </TabContent>
      </div>
    );
  }
};

Team.propTypes = propTypes;

export default Team;
