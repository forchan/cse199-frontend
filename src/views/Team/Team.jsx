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
import InstructorCard from '../../components/Cards/InstructorCard.jsx'

class Team extends Component {
  state = {
    activeTab: '1',
  }
  toggle = (tab) => {
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
    this.props.state.officeHours.forEach((officeHour) => {
      officeHourMap.set(officeHour.instructor_id, officeHour);
    });
    this.props.state.instructors.forEach((instructor) => {
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
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Instructors
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Teaching Assistants
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Add New
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

          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Team;
