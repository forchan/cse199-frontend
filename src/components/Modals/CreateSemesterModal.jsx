import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {
  displayNotification,
  SUCCESS,
  ERROR
} from '../../utils/NotificationUtils.js';
import {
  validateResponseString,
  replaceIfNull
} from '../../utils/StringUtils.js';
import { getCurrentYear, getNextYears } from '../../utils/DateUtils.js';
import {
  COURSE_NAME,
  COURSE_NUMBER,
  COURSE_DEPARTMENT,
  COURSE_SEMESTERS
} from '../../constants/CourseConstants.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const CreateSemesterModal = ({
  isOpen,
  toggle
}) => {
  const [courseDept, setCourseDept] = useState(COURSE_DEPARTMENT);
  const [courseNumber, setCourseNumber] = useState(COURSE_NUMBER);
  const [courseSemester, setCourseSemester] = useState(COURSE_SEMESTERS[0]);
  const [courseYear, setCourseYear] = useState(getCurrentYear());
  const [courseName, setCourseName] = useState(COURSE_NAME);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [holidayWeek, setHolidayWeek] = useState('');

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>
        Create Semester
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        <Form>
          <Row form>
            <Col sm={3}>
              <FormGroup>
                <Label for="materialType">Department</Label>
                <Input
                  type="select"
                  name="courseDept"
                  id="courseDept"
                  value={courseDept}
                  onChange={e => setCourseDept(e.target.value)}
                >
                  <option>{COURSE_DEPARTMENT}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="format">Course #</Label>
                <Input
                  type="select"
                  name="courseNumber"
                  id="courseNumber"
                  value={courseNumber}
                  onChange={e => setCourseNumber(e.target.value)}
                >
                  <option>{COURSE_NUMBER}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup>
                <Label for="materialType">Semester</Label>
                <Input
                  type="select"
                  name="courseSemester"
                  id="courseSemester"
                  value={courseSemester}
                  onChange={e => setCourseSemester(e.target.value)}
                >
                  {COURSE_SEMESTERS.map(semester => {
                    return <option key={semester}>{semester}</option>;
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="format">Year</Label>
                <Input
                  type="select"
                  name="courseYear"
                  id="courseYear"
                  value={courseYear}
                  onChange={e => setCourseYear(e.target.value)}
                >
                  {getNextYears(5).map(year => {
                    return <option key={year}>{year}</option>
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          &nbsp;
          <Row form>
            <Col>
              <FormGroup>
                <Label for="materialType">Course Name</Label>
                <Input
                  type="text"
                  name="courseName"
                  id="courseName"
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          &nbsp;
          <Row form>
            <Col sm={4}>
              <FormGroup>
                <Label for="materialType">Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label for="materialType">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="format">Holiday Week</Label>
                <Input
                  type="date"
                  name="holidayWeek"
                  id="holidayWeek"
                  value={holidayWeek}
                  onChange={e => setHolidayWeek(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Create</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

CreateSemesterModal.propTypes = propTypes;

export default CreateSemesterModal;
