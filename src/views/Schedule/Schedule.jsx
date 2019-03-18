import React, { Component } from 'react';
import classnames from 'classnames';
import { Table, Card, Button, Nav, Modal, ModalHeader, ModalBody, ModalFooter,
TabContent, TabPane, NavItem, NavLink, CardTitle, CardText, Row, Col } from 'reactstrap';
import ModuleModal from '../../components/Modals/ModuleModal.jsx';
import { INTRO_MODULE } from '../../constants/ScheduleConstants.js';

class Schedule extends Component {
  state = {
    modal: false,
    moduleModalHeaderTitle: '',
    modalHeaderClassName: ''
  }
  openModalWithValues = (moduleName, className) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      moduleModalHeaderTitle: moduleName,
      modalHeaderClassName: className
    }));
  }
  closeModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      moduleModalHeaderTitle: '',
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
        <ModuleModal
          isOpen={this.state.modal}
          toggleClose={this.closeModal}
          modalHeaderClassName={this.state.modalHeaderClassName}
          modalHeaderTitle={this.state.moduleModalHeaderTitle}
        />
        <Card>
          <Table bordered responsive>
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
                let introModuleName = moduleMap.get(INTRO_MODULE) ? moduleMap.get(INTRO_MODULE) : "Empty";
                let introModuleClassName = "text-dark";
                return (
                  <tr key={rowKey}>
                    <th scope="row">{sectionGroup.section_group_name}</th>
                    <td
                      className={introModuleClassName}
                      onClick={() => this.openModalWithValues(introModuleName, introModuleClassName)}
                    >
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
