import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
  Button,
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
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggleClose} size="lg">
          <ModalHeader className={this.props.modalHeaderClassName} toggle={this.props.toggleClose}>
            {this.props.module.text}&nbsp;
            [{prettyFormatDate(this.props.module.date_start)} to {''}
            {prettyFormatDate(this.props.module.date_end)}]
          </ModalHeader>
          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggleTab('1'); }}
                >
                  Activities
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
                  Assignments
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
                {this.props.activities
                  .filter((activity) => (
                    (activity.section_group_id === this.props.module.section_group_id)
                    && (activity.date_start === this.props.module.date_start)
                    && (activity.date_end === this.props.module.date_end)
                  ))
                  .map((activity, index) => {
                    return (
                      <MaterialCard key={index} material={activity} />
                    )
                  })
                }
              </TabPane>
              <TabPane tabId="2">
                {this.props.lectureNotes
                  .filter((lectureNote) => (
                    (lectureNote.section_group_id === this.props.module.section_group_id)
                    && (lectureNote.date_start === this.props.module.date_start)
                    && (lectureNote.date_end === this.props.module.date_end)
                  ))
                  .map((lectureNote, index) => {
                    return (
                      <MaterialCard key={index} material={lectureNote} />
                    )
                  })
                }
              </TabPane>
              <TabPane tabId="3">
                {this.props.assignments
                  .filter((assignment) => (
                    (assignment.section_group_id === this.props.module.section_group_id)
                    && (assignment.date_start === this.props.module.date_start)
                    && (assignment.date_end === this.props.module.date_end)
                  ))
                  .map((assignment, index) => {
                    return (
                      <MaterialCard key={index} material={assignment} />
                    )
                  })
                }
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    <h4>Insert staff here @_@</h4>
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

ModuleModal.propTypes = {
  isOpen:  PropTypes.bool,
  toggleClose: PropTypes.func,
  modalHeaderClassName: PropTypes.string,
  module: PropTypes.object,
  activities: PropTypes.array,
  assignments: PropTypes.array,
  lectureNotes: PropTypes.array
}

export default ModuleModal;
