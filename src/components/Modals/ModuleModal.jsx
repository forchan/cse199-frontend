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
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  CardDeck
} from 'reactstrap';
import MaterialCard from '../Cards/MaterialCard.jsx';
import AddMaterialModal from '../Modals/AddMaterialModal.jsx';
import AddStaffToModuleModal from '../Modals/AddStaffToModuleModal.jsx';
import { prettyFormatDate } from '../../utils/ScheduleUtils.js';
import { getLectureStaff } from '../../utils/SectionInstructorUtils.js';

const propTypes = {
  isOpen:  PropTypes.bool.isRequired,
  toggleClose: PropTypes.func.isRequired,
  headerTextColor: PropTypes.string,
  courseModule: PropTypes.object,
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
  courseModule,
  activities,
  assignments,
  lectureNotes,
  allSectionInstructors,
  sectionGroupNameToIdMap
}) => {
  const lectureStaff = getLectureStaff(
    allSectionInstructors,
    courseModule.section_group_id,
    courseModule.date_start,
    courseModule.date_end
  );
  console.log(courseModule)
  console.log(lectureStaff)
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
  if (courseModule === undefined) {
    return (
      <Modal isOpen={isOpen} toggle={toggleClose} size="md" autoFocus={false}>
        <ModalHeader className={headerTextColor} toggle={toggleClose}>
          No module, add one?
        </ModalHeader>
        <ModalBody style={{ height: 'auto' }}>
          <Form>
            <FormGroup row>
              <Label for="moduleName" sm={3}><b>Module name</b></Label>
              <Col sm={9}>
                <Input type="text" name="moduleName" id="moduleName" placeholder="Enter name" autoFocus />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleClose}>Add</Button>{' '}
          <Button color="secondary" onClick={toggleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  // return module content if the module exists
  return (
    <Fragment>
      <AddMaterialModal
        isOpen={addMaterialModal}
        toggle={toggleAddMaterialModal}
        courseModule={courseModule}
      />
      <AddStaffToModuleModal
        isOpen={addStaffToModuleModal}
        toggle={toggleAddStaffToModuleModal}
      />
      <Modal isOpen={isOpen} toggle={toggleClose} size="lg">
        <ModalHeader className={headerTextColor} toggle={toggleClose}>
          {courseModule.text}&nbsp;
          [{prettyFormatDate(courseModule.date_start)} to {''}
          {prettyFormatDate(courseModule.date_end)}]
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
                  (activity.section_group_id === courseModule.section_group_id)
                  && (activity.date_start === courseModule.date_start)
                  && (activity.date_end === courseModule.date_end)
                ))
                .map((activity, index) => {
                  return (
                    <MaterialCard key={index} material={activity} />
                  )
                })
              }
            </TabPane>
            <TabPane tabId="2">
              {lectureNotes
                .filter((lectureNote) => (
                  (lectureNote.section_group_id === courseModule.section_group_id)
                  && (lectureNote.date_start === courseModule.date_start)
                  && (lectureNote.date_end === courseModule.date_end)
                ))
                .map((lectureNote, index) => {
                  return (
                    <MaterialCard key={index} material={lectureNote} />
                  )
                })
              }
            </TabPane>
            <TabPane tabId="3">
              {assignments
                .filter((assignment) => (
                  (assignment.section_group_id === courseModule.section_group_id)
                  && (assignment.date_start === courseModule.date_start)
                  && (assignment.date_end === courseModule.date_end)
                ))
                .map((assignment, index) => {
                  return (
                    <MaterialCard key={index} material={assignment} />
                  )
                })
              }
            </TabPane>
            <TabPane tabId="4">
              <CardDeck>

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
