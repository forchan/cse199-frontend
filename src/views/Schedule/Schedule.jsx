import React, { Component } from 'react';
import classnames from 'classnames';
import { Table, Card, Button, Nav, Modal, ModalHeader, ModalBody, ModalFooter,
TabContent, TabPane, NavItem, NavLink, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import { INTRO_MODULE } from '../../constants/ScheduleConstants.js'

class Schedule extends Component {
  state = {
    modal: false,
    activeTab: '1',
    openModalModuleName: '',
    modalHeaderClassName: ''
  }
  openModalWithValues = (moduleName, className) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      openModalModuleName: moduleName,
      modalHeaderClassName: className
    }));
  }
  closeModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      openModalModuleName: '',
      modalHeaderClassName: ''
    }));
  }
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  prettyFormatDate = (dateString) => { // yyyy-mm-dd to mm-dd or m-dd
    let monthStartIndex = (dateString.charAt(5) === '0') ? 6 : 5; // m vs. mm
    return dateString.substring(monthStartIndex);
  }
  /* calendarMap uses "start date : end date" as key and block number as value
   * moduleMap uses "section group id : calendar block number" as key and
   * module name as value
   *
   * note: the key pairs are seperate by ":" as a separator
   */
  joinValuesAsKey = (value1, value2) => {
    let keyContent = [ value1, value2 ];
    return keyContent.join(':');
  }
  /* calendarMap uses key as "start date : end date" joined together using
   * joinValuesAsKey and the corresponding calendar block number as value
   */
  configureCalendarMap = (calendar) => {
    let calendarMap = new Map();
    let blockNumber = 0;
    calendar.forEach((block) => {
      let key = this.joinValuesAsKey(block.start, block.end);
      calendarMap.set(key, blockNumber++);
    });
    return calendarMap;
  }
  /* moduleMap uses key as "section group id : calendar block number"
   * and the corresponding module name, which is module.text, as value
   */
  configureModuleMap = (modules, calendarMap) => {
    let moduleMap = new Map();
    modules.forEach((module) => {
      if (module.section_group_id === null) {
        moduleMap.set(INTRO_MODULE, module.text);
        return;
      }
      let moduleSectionGroup = module.section_group_id;
      let calendarBlockNumber = calendarMap.get(this.joinValuesAsKey(module.date_start, module.date_end))
      let moduleKey = this.joinValuesAsKey(moduleSectionGroup, calendarBlockNumber);
      moduleMap.set(moduleKey, module.text);
    });
    return moduleMap;
  }
  render() {
    const calendarMap = this.configureCalendarMap(this.props.state.calendar);
    const moduleMap = this.configureModuleMap(this.props.state.modules, calendarMap);
    const rotatingModuleColumns = ['1', '2', '3', '4', '5', '6'];
    const textColors = [
      "text-primary",
      "text-secondary",
      "text-success",
      "text-danger",
      "text-warning",
      "text-info"
    ];

    return (
      <div className="content">
        <Modal isOpen={this.state.modal} toggle={this.closeModal} className="modal-lg">
          <ModalHeader className={this.state.modalHeaderClassName} toggle={this.closeModal}>
            {this.state.openModalModuleName}
          </ModalHeader>
          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggleTab('1'); }}
                >
                  Tab1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggleTab('2'); }}
                >
                  Moar Tabs
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Tab 1 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.closeModal}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Card>
          <Table bordered>
            <thead>
              <tr>
                <th></th>
                <th>Intro Weeks</th>
                <th>Weeks 3 - 4</th>
                <th>Weeks 5 - 6</th>
                <th>Weeks 7 - 8</th>
                <th>Weeks 9 - 10</th>
                <th>Weeks 11 - 12</th>
                <th>Weeks 13 - 14</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Section</th>
                {this.props.state.calendar.map((block, key) => {
                  return (
                    <td key={key}>
                      {this.prettyFormatDate(block.start)} to {this.prettyFormatDate(block.end)}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.state.sectionGroups.map((sectionGroup, rowKey)=> {
                return (
                  <tr key={rowKey}>
                    <th scope="row">{sectionGroup.section_group_name}</th>
                    <td className="text-dark" onClick={() => alert(sectionGroup.section_group_name)}>
                      {moduleMap.get(INTRO_MODULE)}
                    </td>
                    {rotatingModuleColumns.map((columnNumber, colKey) => {
                      let moduleName = moduleMap.get(this.joinValuesAsKey(sectionGroup.sg_id, columnNumber)) ?
                            moduleMap.get(this.joinValuesAsKey(sectionGroup.sg_id, columnNumber)) : "Empty";
                      let className = textColors[(6 + parseInt(colKey) - parseInt(rowKey)) % 6];
                      return (
                        <td
                          key={colKey}
                          className={className}
                          onClick={() => this.openModalWithValues(moduleName, className)}
                        >
                          {moduleName}
                        </td>
                      );
                    })
                    }
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </div>
    );
  }
}

export default Schedule;
