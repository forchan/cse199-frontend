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
  EMPTY,
  INTRO_MODULE,
  INTRO_MODULE_TEXT_COLOR,
  ROTATING_COLUMNS,
  TEXT_COLORS
} from '../../constants/ScheduleConstants.js';

class Schedule extends Component {
  state = {
    moduleModal: false,
    module: {}, // this is the target module that the module-modal opens
    moduleModalHeaderTextColor: '', // determines the header color of the modal
    sectionModal: false,
    sectionGroup: {} // this is the target section group the section-modal opens
  }
  openModuleModalWithValues = (module, textColor) => {
    this.setState(prevState => ({
      moduleModal: !prevState.moduleModal,
      module: module, // this sets the target module
      moduleModalHeaderTextColor: textColor
    }));
  }
  closeModuleModal = () => {
    this.setState(prevState => ({
      moduleModal: !prevState.moduleModal,
      module: {},
      modulemoduleModalHeaderTextColor: ''
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
          headerTextColor={this.state.moduleModalHeaderTextColor}
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
                let introModule = moduleMap.get(INTRO_MODULE); // undefined if no module
                return (
                  <tr key={rowIndex}>
                    <th scope="row" onClick={() => { this.openSectionModalWithValues(sectionGroup) }}>
                      {sectionGroup.section_group_name}
                    </th>
                    <td
                      className={INTRO_MODULE_TEXT_COLOR}
                      onClick={() => { this.openModuleModalWithValues(introModule, INTRO_MODULE_TEXT_COLOR) }}
                    >
                      {(introModule) ? introModule.text : EMPTY}
                    </td>
                    {ROTATING_COLUMNS.map((columnNumber, colIndex) => {
                      let moduleTextColor = TEXT_COLORS[(6 + parseInt(colIndex) - parseInt(rowIndex)) % 6];
                      // undefined if no module
                      let module = moduleMap.get(joinValuesAsKey(sectionGroup.sg_id, columnNumber));
                      return (
                        <td
                          key={colIndex}
                          className={moduleTextColor}
                          onClick={() => { this.openModuleModalWithValues(module, moduleTextColor) }}
                        >
                          {(module) ? module.text : EMPTY}
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
