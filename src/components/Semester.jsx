import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CreateSemesterModal from './Modals/CreateSemesterModal.jsx';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Label,
  Col,
  Input
} from 'reactstrap';
import {
  displayNotification,
  SUCCESS,
  WARNING
} from '../utils/NotificationUtils.js';
import { upperCaseFirstLetterOnly, isNullOrEmpty } from '../utils/StringUtils.js';

const propTypes = {
  semesters: PropTypes.array.isRequired,
  courseId: PropTypes.string.isRequired,
  courseYear: PropTypes.string.isRequired,
  courseSemester: PropTypes.string.isRequired,
  setCourseDetails: PropTypes.func.isRequired,
  loadAllContent: PropTypes.func.isRequired
};

const Semester = ({
  semesters,
  courseId,
  courseYear,
  courseSemester,
  setCourseDetails,
  loadAllContent
}) => {
  const [selectedSemesterId, setSelectedSemesterId] = useState('');
  const [createNewModal, setModal] = useState(false);
  const [activeTab, setTab] = useState('1');
  const toggleModal = () => setModal(!createNewModal);
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setTab(tab);
    }
  };
  const switchSemester = async () => {
    if (isNullOrEmpty(selectedSemesterId)) {
      displayNotification('You did not select a semester', WARNING);
      return;
    }
    if (selectedSemesterId === courseId) {
      displayNotification('You are already viewing the selected semester', WARNING);
      return;
    }
    const selectedSemesterObjectInArray = semesters.filter(semester => (
      semester.course_id === selectedSemesterId
    ));
    const selectedSemesterObject = selectedSemesterObjectInArray[0];
    const { course_year, course_semester } = selectedSemesterObject;
    loadAllContent(selectedSemesterId);
    setCourseDetails(selectedSemesterId, course_year, course_semester);
    displayNotification('Semester switched!', SUCCESS);
  };

  return (
    <div className="content">
      <CreateSemesterModal
        isOpen={createNewModal}
        toggle={toggleModal}
      />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggleTab('1')}
          >
            Switch
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => toggleModal()}>
            Create New{' '}
            <span data-notify="icon" className="nc-icon nc-spaceship" />
          </NavLink>
        </NavItem>
      </Nav>
      &nbsp;
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Card style={{ width: '550px' }}>
            <CardBody>
              <CardTitle>
                <b>
                  Currently Viewing {' '}
                </b>
                [ {upperCaseFirstLetterOnly(courseSemester)} {courseYear} ]
              </CardTitle>
              &nbsp;
              <FormGroup row>
                <Label for="selectSemester" sm={3}>Select Semester</Label>
                <Col sm={9}>
                  <Input
                    type="select"
                    name="selectSemester"
                    id="selectSemester"
                    value={selectedSemesterId}
                    onChange={e => setSelectedSemesterId(e.target.value)}
                  >
                    <option></option>
                    {semesters.map(semester => {
                      return (
                        <option key={semester.course_id} value={semester.course_id}>
                          {semester.course_department}{' '}
                          {semester.course_number} -{' '}
                          {semester.course_name} -{' '}
                          {upperCaseFirstLetterOnly(semester.course_semester)}{' '}
                          {semester.course_year}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <Button className="float-right" onClick={switchSemester}>Switch</Button>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          This wont't show lol.
        </TabPane>
      </TabContent>
    </div>
  );
};

Semester.propTypes = propTypes;

export default Semester;
