import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardColumns
} from 'reactstrap';
import classnames from 'classnames';
import InstructorCard from '../../components/Cards/InstructorCard.jsx';
import AddInstructorModal from '../../components/Modals/AddInstructorModal.jsx';

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
    var officeHourMap = new Map();
    var instructorCards = [];
    var taCards = [];
    this.props.officeHours.forEach((officeHour) => {
      officeHourMap.set(officeHour.instructor_id, officeHour);
    });
    this.props.instructors.forEach((instructor) => {
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
          isOpen={this.state.addInstructorModal}
          toggle={this.toggleModal}
        />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggleTab('1'); }}
            >
              Instructors
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
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
        <TabContent activeTab={this.state.activeTab}>
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

export default Team;
