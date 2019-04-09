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
import AddInstructorModal from './Modals/AddOrEditInstructorModal.jsx';

const propTypes = {
  instructors: PropTypes.array.isRequired,
  officeHours: PropTypes.array.isRequired
};

class Team extends Component {
  state = {
    addInstructorModal: false,
    activeTab: '1'
  }
  toggleModal = () => {
    this.setState(prevState => ({
      addInstructorModal: !prevState.addInstructorModal
    }));
  }
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const { instructors, officeHours } = this.props;
    const { addInstructorModal, activeTab } = this.state;
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
          />
        );
      } else {
        instructorCards.push(
          <InstructorCard
            key={instructor.instructor_id}
            instructor={instructor}
            officeHour={officeHourMap.get(instructor.instructor_id)}
          />
        );
      }
    });

    return (
      <div className="content">
        <AddInstructorModal
          isOpen={addInstructorModal}
          toggle={this.toggleModal}
        />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { this.toggleTab('1'); }}
            >
              Instructors
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { this.toggleTab('2'); }}
            >
              Teaching Assistants
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => { this.toggleModal(); }}
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
}

Team.propTypes = propTypes;

export default Team;
