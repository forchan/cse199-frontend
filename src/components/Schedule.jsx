import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Card
} from 'reactstrap';
import ModuleModal from './Modals/ModuleModal.jsx';
import SectionModal from '../containers/modals/SectionModalContainer.jsx';
import {
  configureCalendarMap,
  configureModuleMap,
  joinValuesAsKey,
  prettyFormatDate
} from '../utils/ScheduleUtils.js';
import {
  EMPTY,
  INTRO_MODULE,
  INTRO_MODULE_TEXT_COLOR,
  ROTATING_COLUMNS,
  TEXT_COLORS
} from '../constants/ScheduleConstants.js';

const propTypes = {
  calendarBlocks: PropTypes.array.isRequired,
  modules: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  assignments: PropTypes.array.isRequired,
  lectureNotes: PropTypes.array.isRequired,
  sectionGroups: PropTypes.array.isRequired
};

class Schedule extends Component {
  state = {
    moduleModal: false,
    courseModule: {}, // this is the target module that the module-modal opens, also "module" is reserved for webpack use I think
    moduleModalHeaderTextColor: '', // determines the header color of the modal
    sectionModal: false,
    sectionGroup: {} // this is the target section group the section-modal opens
  };
  openModuleModalWithValues = (courseModule, textColor) => {
    this.setState(prevState => ({
      moduleModal: !prevState.moduleModal,
      courseModule: courseModule, // this sets the target module
      moduleModalHeaderTextColor: textColor
    }));
  };
  closeModuleModal = () => {
    this.setState(prevState => ({
      moduleModal: !prevState.moduleModal,
      courseModule: {},
      modulemoduleModalHeaderTextColor: ''
    }));
  };
  openSectionModalWithValues = (sectionGroup) => {
    this.setState(prevState => ({
      sectionModal: !prevState.sectionModal,
      sectionGroup: sectionGroup // this sets the sectionGroup
    }));
  };
  closeSectionModal = () => {
    this.setState(prevState => ({
      sectionModal: !prevState.sectionModal,
      sectionGroup: {} // this sets the sectionGroup
    }));
  };
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  
  render() {
    const {
      sectionModal,
      moduleModal,
      sectionGroup,
      courseModule,
      moduleModalHeaderTextColor
    } = this.state;
    const {
      calendarBlocks,
      modules,
      activities,
      assignments,
      lectureNotes,
      sectionGroups
    } = this.props;

    const calendarMap = configureCalendarMap(calendarBlocks);
    const moduleMap = configureModuleMap(modules, calendarMap);

    return (
      <div className="content">
        <SectionModal
          isOpen={sectionModal}
          toggleClose={this.closeSectionModal}
          sectionGroup={sectionGroup}
        />
        <ModuleModal
          isOpen={moduleModal}
          toggleClose={this.closeModuleModal}
          headerTextColor={moduleModalHeaderTextColor}
          courseModule={courseModule}
          activities={activities}
          assignments={assignments}
          lectureNotes={lectureNotes}
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
                {calendarBlocks.map((block, index) => {
                  return (
                    <td key={index}>
                      {prettyFormatDate(block.start)} to {prettyFormatDate(block.end)}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sectionGroups.map((sectionGroup, rowIndex) => {
                let introModule = moduleMap.get(INTRO_MODULE); // undefined if no module
                return (
                  <tr key={rowIndex}>
                    <th scope="row" onClick={() => this.openSectionModalWithValues(sectionGroup)}>
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
                      let courseModule = moduleMap.get(joinValuesAsKey(sectionGroup.sg_id, columnNumber));
                      return (
                        <td
                          key={colIndex}
                          className={moduleTextColor}
                          onClick={() => this.openModuleModalWithValues(courseModule, moduleTextColor)}
                        >
                          {(courseModule) ? courseModule.text : EMPTY}
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
  };
};

Schedule.propTypes = propTypes;

export default Schedule;
