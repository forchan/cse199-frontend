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
  replaceIfNull,
  isNullOrEmpty
} from '../../utils/StringUtils.js';
import { getNextYears } from '../../utils/DateUtils.js';
import { postApiStuff } from '../../utils/ApiUtils.js';
import { prepareCreateSemesterForm } from '../../utils/FormUtils.js';
import { API_SECTION_URL } from '../../constants/ApiConstants.js';
import {
  COURSE_NAME,
  COURSE_NUMBER,
  COURSE_DEPARTMENT,
  COURSE_SEMESTERS
} from '../../constants/CourseConstants.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  semesters: PropTypes.array.isRequired,
  loadSemesters: PropTypes.func.isRequired
};

const CreateSemesterModal = ({
  isOpen,
  toggle,
  semesters,
  loadSemesters
}) => {
  const [courseDept, setCourseDept] = useState(COURSE_DEPARTMENT);
  const [courseNumber, setCourseNumber] = useState(COURSE_NUMBER);
  const [courseSemester, setCourseSemester] = useState(COURSE_SEMESTERS[0]);
  const [courseYear, setCourseYear] = useState('');
  const [courseName, setCourseName] = useState(COURSE_NAME);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [holidayWeek, setHolidayWeek] = useState('');
  const [displayRequiredPrompt, setDisplayRequiredPrompt] = useState(false);
  const [semesterExistsPrompt, setSemesterExistsPrompt] = useState(false);
  const [checkDates, setCheckDates] = useState(false);

  const validForm = () => {
    if (isNullOrEmpty(startDate)
      || isNullOrEmpty(endDate)
      || isNullOrEmpty(holidayWeek)
      || isNullOrEmpty(courseName)
      || isNullOrEmpty(courseYear)) {
        setDisplayRequiredPrompt(true);
        setSemesterExistsPrompt(false);
        setCheckDates(false);
      return false;
    }
    let semesterExists = false;
    semesters.forEach(semester => {
      if (semester.course_number === courseNumber
        && semester.course_department === courseDept
        && semester.course_semester === courseSemester
        && semester.course_year === courseYear) {
          semesterExists = true;
          setSemesterExistsPrompt(true);
          setDisplayRequiredPrompt(false);
          setCheckDates(false);
        }
    });
    if (semesterExists) {
      return false;
    }
    if (startDate > holidayWeek || holidayWeek > endDate) {
      setDisplayRequiredPrompt(false);
      setSemesterExistsPrompt(false);
      setCheckDates(true);
      return false;
    }
    setDisplayRequiredPrompt(false);
    setSemesterExistsPrompt(false);
    setCheckDates(false);
    return true;
  };

  const createSemester = async () => {
    if (!validForm()) return;
    const formToSubmit = prepareCreateSemesterForm({
      courseDept,
      courseNumber,
      courseSemester,
      courseYear,
      courseName,
      startDate,
      endDate,
      holidayWeek
    });
    const response = await postApiStuff(API_SECTION_URL, formToSubmit);
    if (validateResponseString(response)) {
      loadSemesters();
      displayNotification('The course semester, course calendar, and section groups have been created! You can now switch to it.', SUCCESS);
      toggle();
    } else {
      displayNotification(replaceIfNull(response, 'Unknown error'), ERROR);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>
        Create Semester
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        <p className="text-secondary">* Be careful to double check dates, you can only undo them in the DB</p>
        {(displayRequiredPrompt) &&
          <p className="text-danger">Missing required* inputs</p>
        }
        {(semesterExistsPrompt) &&
          <p className="text-danger">This semester already exists* check semester and year</p>
        }
        {(checkDates) &&
          <p className="text-danger">Dates* are not in chronological order</p>
        }
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
                <Label for="format">Year*</Label>
                <Input
                  type="select"
                  name="courseYear"
                  id="courseYear"
                  value={courseYear}
                  onChange={e => setCourseYear(e.target.value)}
                >
                  <option></option>
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
                <Label for="materialType">Course Name*</Label>
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
                <Label for="materialType"><b>Start</b> Date*</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="format"><b>Holiday</b> Week*</Label>
                <Input
                  type="date"
                  name="holidayWeek"
                  id="holidayWeek"
                  value={holidayWeek}
                  onChange={e => setHolidayWeek(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label for="materialType"><b>End</b> Date*</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={createSemester}>Create</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

CreateSemesterModal.propTypes = propTypes;

export default CreateSemesterModal;
