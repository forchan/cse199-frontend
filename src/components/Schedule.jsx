import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Card
} from 'reactstrap';
import ModuleModal from '../containers/modals/ModuleModalContainer.jsx';
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
    openedModule: {}, // this is the target module that the module-modal opens, also "module" is reserved for webpack use I think
    moduleModalHeaderTextColor: '', // determines the header color of the modal
    moduleOffsetNumber: '',
    sectionModal: false,
    sectionGroup: {} // this is the target section group the section modal and intro module needs
  };
  openModuleModalWithValues = (openedModule, offsetNumber, textColor, sectionGroup = {}) => {
    /* intro module needs the sectionGroup, because intro modules section group
     * is null. By passing a section group to every intro module at every row
     * we can use it filter out which are the lecture section instructors
     */
    this.setState(prevState => ({
      moduleModal: !prevState.moduleModal,
      openedModule: openedModule, // this sets the target module
      sectionGroup: sectionGroup,
      moduleOffsetNumber: offsetNumber,
      moduleModalHeaderTextColor: textColor
    }));
  };
  closeModuleModal = () => {
    this.setState(prevState => ({
      moduleModal: !prevState.moduleModal,
      openedModule: {},
      sectionGroup: {},
      moduleOffsetNumber: '',
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
      openedModule,
      moduleOffsetNumber,
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
          moduleOffsetNumber={moduleOffsetNumber}
          openedModule={openedModule}
          sectionGroup={sectionGroup}
          activities={activities}
          assignments={assignments}
          lectureNotes={lectureNotes}
        />
        <Card>
          <Table bordered responsive>
            <thead>
              <tr>
                <th></th>
                <th className="schedule-table-col">Intro Weeks</th>
                <th className="schedule-table-col">Weeks 3 - 4</th>
                <th className="schedule-table-col">Weeks 5 - 6</th>
                <th className="schedule-table-col">Weeks 7 - 8</th>
                <th className="schedule-table-col">Weeks 9 - 10</th>
                <th className="schedule-table-col">Weeks 11 - 12</th>
                <th className="schedule-table-col">Weeks 13 - 14</th>
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
                const introModule = moduleMap.get(INTRO_MODULE); // undefined if no module

                return (
                  <tr key={rowIndex}>
                    <th scope="row" onClick={() => this.openSectionModalWithValues(sectionGroup)}>
                      {sectionGroup.section_group_name}
                    </th>
                    <td
                      className={INTRO_MODULE_TEXT_COLOR}
                      onClick={() => this.openModuleModalWithValues(introModule, '0', INTRO_MODULE_TEXT_COLOR, sectionGroup)}
                    >
                      {(introModule) ? introModule.text : EMPTY}
                    </td>
                    {ROTATING_COLUMNS.map((columnNumber, colIndex) => {
                      const moduleOffsetNumber = 1 + ((6 + parseInt(colIndex) - parseInt(rowIndex)) % 6);
                      const moduleTextColor = TEXT_COLORS[moduleOffsetNumber - 1]; // minus 1 since array index starts at 0
                      // undefined if no module
                      const openedModule = moduleMap.get(joinValuesAsKey(sectionGroup.sg_id, columnNumber));

                      return (
                        <td
                          key={colIndex}
                          className={moduleTextColor}
                          onClick={() => this.openModuleModalWithValues(openedModule, (moduleOffsetNumber).toString(), moduleTextColor)}
                        >
                          {(openedModule) ? openedModule.text : EMPTY}
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
