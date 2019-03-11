import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardColumns,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import InstructorCard from '../../components/Instructor/InstructorCard.jsx'
import { getStuff } from '../../utils/ApiUtils.js';
import { GET_INSTRUCTOR_LIST } from '../../constants/ApiConstants.js';

class Team extends Component {
  state = {
    activeTab: '1',
    instructors: []
  }
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  componentDidMount = async () => {
    let { data } = await getStuff({ action: GET_INSTRUCTOR_LIST });
    this.setState({ instructors: data.instructors });
  }
  render() {
    var instructorCards = [];
    var taCards = [];
    this.state.instructors.forEach((instructor) => {
      if (instructor.instructor_type !== 'INSTRUCTOR') {
        taCards.push(
          <InstructorCard instructor={instructor} key={instructor.instructor_id} />
        );
      } else {
        instructorCards.push(
          <InstructorCard instructor={instructor} key={instructor.instructor_id} />
        );
      }
    })
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
        </TabContent>
      </div>
    );
  }
}

export default Team;
