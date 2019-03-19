import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from 'reactstrap';
import MaterialCard from '../Cards/MaterialCard.jsx';
import { prettyFormatDate } from '../../utils/ScheduleUtils.js';

class ModuleModal extends Component {
  state = {
    activeTab: '1'
  }
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <Fragment>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggleClose} className={"modal-lg"}>
          <ModalHeader className={this.props.modalHeaderClassName} toggle={this.props.toggleClose}>
            {this.props.module.text}&nbsp;&nbsp;
            {prettyFormatDate(this.props.module.date_start)} to {''}
            {prettyFormatDate(this.props.module.date_end)}
          </ModalHeader>
          <ModalBody style={{ backgroundColor: '#f4f3ef' }}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggleTab('1'); }}
                >
                  Assignments
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggleTab('2'); }}
                >
                  Lecture Notes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggleTab('3'); }}
                >
                  Activities
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggleTab('4'); }}
                >
                  Staff
                </NavLink>
              </NavItem>
            </Nav>
            &nbsp;
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                {this.props.assignments.map((assignment, key) => {
                  if (assignment.date_start === this.props.module.date_start) {
                    if (assignment.date_end === this.props.module.date_end) {
                      return (
                        <MaterialCard key={key} material={assignment} />
                      )
                    }
                  }
                })}
              </TabPane>
              <TabPane tabId="2">
                {this.props.lectureNotes.map((lectureNote, key) => {
                  if (lectureNote.date_start === this.props.module.date_start) {
                    if (lectureNote.date_end === this.props.module.date_end) {
                      return (
                        <MaterialCard key={key} material={lectureNote} />
                      )
                    }
                  }
                })}
              </TabPane>
              <TabPane tabId="3">
                {this.props.activities.map((activity, key) => {
                  if (activity.date_start === this.props.module.date_start) {
                    if (activity.date_end === this.props.module.date_end) {
                      return (
                        <MaterialCard key={key} material={activity} />
                      )
                    }
                  }
                })}
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    <h4>Tab 4 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggleClose}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.props.toggleClose}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ModuleModal;
