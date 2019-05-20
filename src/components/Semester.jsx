import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useCookies } from 'react-cookie';
import CreateSemesterModal from '../containers/modals/CreateSemesterModalContainer.jsx';
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
import { getSemesterObjectFromArrayByCourseId } from '../utils/ArrayUtils.js';
import {
  COURSE_ID,
  COURSE_YEAR,
  COURSE_SEMESTER
} from '../constants/CookieConstants.js';

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
  // cookies
  const [cookies, setCookie] = useCookies([COURSE_ID, COURSE_YEAR, COURSE_SEMESTER]);
  const setAllCookies = (courseId, courseYear, courseSemester) => {
    setCookie(COURSE_ID, courseId, { path: '/' });
    setCookie(COURSE_YEAR, courseYear, { path: '/' });
    setCookie(COURSE_SEMESTER, courseSemester, { path: '/' });
  };
  // this functional component's state
  const [selectedSemesterCourseId, setselectedSemesterCourseId] = useState('');
  const [createNewModal, setModal] = useState(false);
  const [activeTab, setTab] = useState('1');
  const toggleModal = () => setModal(!createNewModal);
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setTab(tab);
    }
  };

  const switchSemester = async () => {
    if (isNullOrEmpty(selectedSemesterCourseId)) {
      displayNotification('You did not select a semester', WARNING);
      return;
    }
    if (selectedSemesterCourseId === courseId) {
      displayNotification('You are already viewing the selected semester', WARNING);
      return;
    }
    const selectedSemesterObject = getSemesterObjectFromArrayByCourseId(
      selectedSemesterCourseId,
      semesters
    );
    const { course_year, course_semester } = selectedSemesterObject;
    loadAllContent(selectedSemesterCourseId);
    setCourseDetails(selectedSemesterCourseId, course_year, course_semester);
    setAllCookies(selectedSemesterCourseId, course_year, course_semester);
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
                    value={selectedSemesterCourseId}
                    onChange={e => setselectedSemesterCourseId(e.target.value)}
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
          Also, to suppress 'cookies' not being used warning, here is the current
          course ID that we are viewing:
          {cookies[COURSE_ID] && <p>cookies[COURSE_ID]</p>}
          'cookies' is not really used for anything,
          but it gets returned in 'useCookies' function
        </TabPane>
      </TabContent>
    </div>
  );
};

Semester.propTypes = propTypes;

export default Semester;
