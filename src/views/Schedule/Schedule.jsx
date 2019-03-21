import React, { Component } from 'react';
import {
  Table,
  Card
} from 'reactstrap';
import ModuleModal from '../../components/Modals/ModuleModal.jsx';
import SectionModal from '../../components/Modals/SectionModal.jsx';
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
    moduleModal: false,
    module: {}, // this is the target module that the module-modal opens
    moduleModalHeaderClassName: '', // determines the header color of the modal
    sectionModal: false,
    sectionGroup: {} // this is the target section group the section-modal opens
  }
  openModuleModalWithValues = (module, className) => {
    this.setState(prevState => ({
      moduleModal: !prevState.moduleModal,
      module: module, // this sets the target module
      moduleModalHeaderClassName: className
    }));
  }
  closeModuleModal = () => {
    this.setState(prevState => ({
      moduleModal: !prevState.moduleModal,
      module: {},
      modulemoduleModalHeaderClassName: ''
    }));
  }
  openSectionModalWithValues = (sectionGroup) => {
    this.setState(prevState => ({
      sectionModal: !prevState.sectionModal,
      sectionGroup: sectionGroup // this sets the sectionGroup
    }));
  }
  closeSectionModal = () => {
    this.setState(prevState => ({
      sectionModal: !prevState.sectionModal,
      sectionGroup: {} // this sets the sectionGroup
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
        <SectionModal
          isOpen={this.state.sectionModal}
          toggleClose={this.closeSectionModal}
          sectionGroup={this.state.sectionGroup}
          sections={this.props.state.sections}
        />
        <ModuleModal
          isOpen={this.state.moduleModal}
          toggleClose={this.closeModuleModal}
          modalHeaderClassName={this.state.moduleModalHeaderClassName}
          module={this.state.module}
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
                {this.props.state.calendar.map((block, index) => {
                  return (
                    <td key={index}>
                      {prettyFormatDate(block.start)} to {prettyFormatDate(block.end)}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.state.sectionGroups.map((sectionGroup, rowIndex) => {
                let introModuleClassName = "text-dark";
                let introModuleName = moduleMap.get(INTRO_MODULE)
                  ? moduleMap.get(INTRO_MODULE).text
                  : "Empty";
                let introModule = moduleMap.get(INTRO_MODULE)
                  ? moduleMap.get(INTRO_MODULE)
                  : [];
                return (
                  <tr key={rowIndex}>
                    <th scope="row" onClick={() => { this.openSectionModalWithValues(sectionGroup) }}>
                      {sectionGroup.section_group_name}
                    </th>
                    <td
                      className={introModuleClassName}
                      onClick={() => { this.openModuleModalWithValues(introModule, introModuleClassName) }}
                    >
                      {introModuleName}
                    </td>
                    {ROTATING_COLUMNS.map((columnNumber, colIndex) => {
                      let className = TEXT_COLORS[(6 + parseInt(colIndex) - parseInt(rowIndex)) % 6];
                      let moduleName = moduleMap.get(joinValuesAsKey(sectionGroup.sg_id, columnNumber))
                        ? moduleMap.get(joinValuesAsKey(sectionGroup.sg_id, columnNumber)).text
                        : "Empty";
                      let module = moduleMap.get(joinValuesAsKey(sectionGroup.sg_id, columnNumber))
                        ? moduleMap.get(joinValuesAsKey(sectionGroup.sg_id, columnNumber))
                        : [];
                      return (
                        <td
                          key={colIndex}
                          className={className}
                          onClick={() => { this.openModuleModalWithValues(module, className) }}
                        >
                          {moduleName}
                        </td>
                      );
                    })}
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
