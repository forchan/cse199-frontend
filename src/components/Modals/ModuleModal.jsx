import React, { Fragment, useState } from 'react';
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
  CardDeck
} from 'reactstrap';
import MaterialCard from '../Cards/MaterialCard.jsx';
import ModuleInstructorCard from '../Cards/ModuleInstructorCard.jsx';
import AddMaterialModal from '../../containers/modals/AddOrEditMaterialModalContainer.jsx';
import AddStaffToModuleModal from '../../containers/modals/AddStaffToModuleModalContainer.jsx';
import AddOrEditModuleModal from './AddOrEditModuleModal.jsx';
import { prettyFormatDate } from '../../utils/ScheduleUtils.js';
import { getLectureStaff } from '../../utils/SectionInstructorUtils.js';

const propTypes = {
  isOpen:  PropTypes.bool.isRequired,
  toggleClose: PropTypes.func.isRequired,
  headerTextColor: PropTypes.string.isRequired,
  moduleOffsetNumber: PropTypes.string.isRequired,
  openedModule: PropTypes.object,
  sectionGroup: PropTypes.object.isRequired,
  activities: PropTypes.array.isRequired,
  assignments: PropTypes.array.isRequired,
  lectureNotes: PropTypes.array.isRequired,
  allSectionInstructors: PropTypes.array.isRequired,
  sectionGroupNameToIdMap: PropTypes.object.isRequired
};

const ModuleModal = ({
  isOpen,
  toggleClose,
  headerTextColor,
  moduleOffsetNumber,
  openedModule,
  sectionGroup,
  activities,
  assignments,
  lectureNotes,
  allSectionInstructors,
  sectionGroupNameToIdMap
}) => {
  const [addMaterialModal, setAddMaterialModal] = useState(false);
  const [addStaffToModuleModal, setAddStaffToModuleModal] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const toggleAddMaterialModal = () => setAddMaterialModal(!addMaterialModal);
  const toggleAddStaffToModuleModal = () => setAddStaffToModuleModal(!addStaffToModuleModal);
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  };

  // if the module passed in is undefined, we need to create a new one
  if (openedModule === undefined) {
    return (
      <AddOrEditModuleModal
        isOpen={isOpen}
        toggleClose={toggleClose}
        moduleOffsetNumber={moduleOffsetNumber}
        headerTextColor={headerTextColor}
      />
    );
  }

  // if the module exists, we can get this data
  const sectionGroupId = (openedModule.section_group_id)
    ? openedModule.section_group_id
    : sectionGroup.sg_id;
  const lectureStaff = getLectureStaff(
    allSectionInstructors,
    sectionGroupId,
    openedModule.date_start,
    openedModule.date_end
  );

  // return module content if the module exists
  return (
    <Fragment>
      <AddMaterialModal
        isOpen={addMaterialModal}
        toggle={toggleAddMaterialModal}
        openedModule={openedModule}
      />
      <AddStaffToModuleModal
        isOpen={addStaffToModuleModal}
        toggle={toggleAddStaffToModuleModal}
        openedModule={openedModule}
      />
      <Modal isOpen={isOpen} toggle={toggleClose} size="lg">
        <ModalHeader className={headerTextColor} toggle={toggleClose}>
          {openedModule.text}&nbsp;
          [{prettyFormatDate(openedModule.date_start)} to {''}
          {prettyFormatDate(openedModule.date_end)}]
        </ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => toggleTab('1')}
              >
                Activities
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => toggleTab('2')}
              >
                Lecture Notes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => toggleTab('3')}
              >
                Assignments
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => toggleTab('4')}
              >
                Lecture Staff
              </NavLink>
            </NavItem>
          </Nav>
          &nbsp;
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {activities
                .filter((activity) => (
                  (activity.section_group_id === openedModule.section_group_id)
                  && (activity.date_start === openedModule.date_start)
                  && (activity.date_end === openedModule.date_end)
                ))
                .map((activity, index) => {
                  return (
                    <MaterialCard key={index} material={activity} openedModule={openedModule} />
                  )
                })
              }
            </TabPane>
            <TabPane tabId="2">
              {lectureNotes
                .filter((lectureNote) => (
                  (lectureNote.section_group_id === openedModule.section_group_id)
                  && (lectureNote.date_start === openedModule.date_start)
                  && (lectureNote.date_end === openedModule.date_end)
                ))
                .map((lectureNote, index) => {
                  return (
                    <MaterialCard key={index} material={lectureNote} openedModule={openedModule} />
                  )
                })
              }
            </TabPane>
            <TabPane tabId="3">
              {assignments
                .filter((assignment) => (
                  (assignment.section_group_id === openedModule.section_group_id)
                  && (assignment.date_start === openedModule.date_start)
                  && (assignment.date_end === openedModule.date_end)
                ))
                .map((assignment, index) => {
                  return (
                    <MaterialCard key={index} material={assignment} openedModule={openedModule} />
                  )
                })
              }
            </TabPane>
            <TabPane tabId="4">
              <CardDeck>
                {lectureStaff.map(staffMember => {
                  return <ModuleInstructorCard instructor={staffMember} key={staffMember.instructor_id} />;
                })}
              </CardDeck>
            </TabPane>
          </TabContent>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleAddMaterialModal}>Add Material</Button>{' '}
          <Button color="info" onClick={toggleAddStaffToModuleModal}>Assign Staff</Button>{' '}
          <Button color="secondary" onClick={toggleClose}>Exit</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

ModuleModal.propTypes = propTypes;

export default ModuleModal;
