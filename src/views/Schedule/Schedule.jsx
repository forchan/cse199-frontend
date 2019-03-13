import React, { Component } from 'react';
import { Table, Card, Button, Nav  } from 'reactstrap';
import { Link } from "react-router-dom";
import { INTRO_MODULE } from '../../constants/ScheduleConstants.js'

class Schedule extends Component {
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
    var rows = [];

    this.props.state.sectionGroups.forEach((sectionGroup, rowKey)=> {
      rows.push(
        <tr key={rowKey}>
          <th scope="row">{sectionGroup.section_group_name}</th>
          <td className="text-primary" onClick={() => alert(sectionGroup.section_group_name)}>
            {moduleMap.get(INTRO_MODULE)}
          </td>
          {rotatingModuleColumns.map((columnNumber, colKey) => {
            return (
              <td
                key={colKey}
                className={textColors[(6 + parseInt(colKey) - parseInt(rowKey)) % 6]}
                onClick={() => alert('oh')}
              >
                {moduleMap.get(this.joinValuesAsKey(sectionGroup.sg_id, columnNumber)) ?
                  moduleMap.get(this.joinValuesAsKey(sectionGroup.sg_id, columnNumber)) :
                  "Empty"
                }
              </td>
            );
          })
          }
        </tr>
      );
    });
    return (
      <div className="content">
      <Card>
        <Table bordered>
          <thead>
            <tr>
              <th>Section</th>
              <th>Intro Weeks</th>
              <th>Weeks 3 - 4</th>
              <th>Weeks 5 - 6</th>
              <th>Weeks 7 - 8</th>
              <th>Weeks 9 - 10</th>
              <th>Weeks 11 - 12</th>
              <th>Weeks 13 - 14</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
        </Card>
      </div>
    );
  }
}

export default Schedule;
