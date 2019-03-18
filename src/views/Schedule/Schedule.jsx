import React, { Component } from 'react';
import classnames from 'classnames';
import { Table, Card, Button, Nav, Modal, ModalHeader, ModalBody, ModalFooter,
TabContent, TabPane, NavItem, NavLink, CardTitle, CardText, Row, Col } from 'reactstrap';
import ModuleModal from '../../components/Modals/ModuleModal.jsx';
import {
  configureCalendarMap,
  configureModuleMap,
  joinValuesAsKey,
  prettyFormatDate
} from '../../utils/ScheduleUtils.js';
import {
  INTRO_MODULE,
  ROTATING_COLUMNS,
  TEXT_COLORS
} from '../../constants/ScheduleConstants.js';

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
  render() {
    const calendarMap = configureCalendarMap(this.props.state.calendar);
    const moduleMap = configureModuleMap(this.props.state.modules, calendarMap);

    return (
      <div className="content">
        <ModuleModal
          isOpen={this.state.modal}
          toggleClose={this.closeModal}
          modalHeaderClassName={this.state.modalHeaderClassName}
          modalHeaderTitle={this.state.moduleModalHeaderTitle}
          activities={this.props.state.activities}
          assignments={this.props.state.assignments}
          lectureNotes={this.props.state.lectureNotes}
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
                      {prettyFormatDate(block.start)} to {prettyFormatDate(block.end)}
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
                    {ROTATING_COLUMNS.map((columnNumber, colKey) => {
                      let moduleName = moduleMap.get(joinValuesAsKey(sectionGroup.sg_id, columnNumber)) ?
                            moduleMap.get(joinValuesAsKey(sectionGroup.sg_id, columnNumber)) : "Empty";
                      let className = TEXT_COLORS[(6 + parseInt(colKey) - parseInt(rowKey)) % 6];
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
