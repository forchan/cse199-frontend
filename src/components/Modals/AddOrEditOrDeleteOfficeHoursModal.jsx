import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import {
  displayNotification,
  SUCCESS,
  WARNING,
  ERROR
} from '../../utils/NotificationUtils.js';
import {
  validateResponseString,
  isNullOrEmpty,
  replaceIfNull,
  upperCaseFirstLetterOnly
} from '../../utils/StringUtils.js';
import { postApiStuff } from '../../utils/ApiUtils.js';
import {
  prepareAddOrEditOfficeHoursForm,
  prepareDeleteOfficeHoursForm
} from '../../utils/FormUtils.js';
import { API_INSTRUCTOR_URL } from '../../constants/ApiConstants.js';
import { REG_OFFICE_HOUR_TYPE } from '../../constants/InstructorConstants.js';

const defaultProps = {
  officeHour: {}
}

const propTypes = {
  isOpen:  PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  officeHour: PropTypes.object,
  courseId: PropTypes.string.isRequired,
  courseYear: PropTypes.string.isRequired,
  courseSemester: PropTypes.string.isRequired,
  instructorId: PropTypes.string.isRequired,
  reloadOfficeHours: PropTypes.func.isRequired
};

const AddOrEditOrDeleteOfficeHoursModal = ({
  isOpen,
  toggle,
  officeHour,
  courseId,
  courseYear,
  courseSemester,
  instructorId,
  reloadOfficeHours
}) => {
  const [weekday, setWeekday] = useState(replaceIfNull(officeHour.weekday));
  const [location, setLocation] = useState(replaceIfNull(officeHour.location));
  const [officeHoursType, setofficeHoursType] = useState(replaceIfNull(officeHour.type, REG_OFFICE_HOUR_TYPE));
  const [startTime, setStartTime] = useState(replaceIfNull(officeHour.time_start));
  const [endTime, setEndTime] = useState(replaceIfNull(officeHour.time_end));
  const [displayRequiredPrompt, setDisplayRequiredPrompt] = useState(false);

  const validForm = () => {
    if (isNullOrEmpty(weekday)
      || isNullOrEmpty(location)
      || isNullOrEmpty(startTime)
      || isNullOrEmpty(endTime)) {
        setDisplayRequiredPrompt(true);
        return false;
    }
    setDisplayRequiredPrompt(false);
    return true;
  };

  const submitForm = async () => {
    if (!validForm()) return;
    const formToSubmit = prepareAddOrEditOfficeHoursForm({
      officeHoursId: officeHour.office_hours_id, // will be null if not editing
      instructorId,
      courseId,
      officeHoursType,
      weekday,
      location,
      startTime,
      endTime
    });
    const response = await postApiStuff(API_INSTRUCTOR_URL, formToSubmit);
    if (validateResponseString(response)) {
      reloadOfficeHours(courseId);
      displayNotification('Office hours updated!', SUCCESS);
    } else {
      const errorMessage = 'No office hours updated. You sure you made any changes?';
      displayNotification(replaceIfNull(errorMessage, 'Unknown error'), ERROR);
    }
  };

  const deleteOfficeHours = async () => {
    if (isNullOrEmpty(officeHour.office_hours_id)) {
      displayNotification('No office hours to delete.', WARNING);
      return;
    }
    const formToSubmit = prepareDeleteOfficeHoursForm(officeHour);
    const response = await postApiStuff(API_INSTRUCTOR_URL, formToSubmit);
    if (validateResponseString(response)) {
      reloadOfficeHours(courseId);
      displayNotification('Office hours deleted!', SUCCESS);
      toggle();
    } else {
      displayNotification(replaceIfNull(response, 'Unknown error'), ERROR);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>
        Office Hours [ {upperCaseFirstLetterOnly(courseSemester)} {courseYear} ]
      </ModalHeader>
      <ModalBody style={{ height: 'auto' }}>
        {(displayRequiredPrompt) &&
          <p className="text-danger">Missing required* inputs</p>
        }
        <Form>
          <Row form>
            <Col sm={6}>
              <FormGroup>
                <Label for="weekday">Weekday* [ex. M or T-R]</Label>
                <Input
                  type="text"
                  name="weekday"
                  id="weekday"
                  value={weekday}
                  onChange={e => setWeekday(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="location">Location*</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm={4}>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  type="text"
                  name="type"
                  id="type"
                  disabled
                  value={officeHoursType}
                  onChange={e => setofficeHoursType(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label for="startTime">Start time*</Label>
                <Input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="endTime">End time*</Label>
                <Input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submitForm}>Save</Button>{' '}
        <Button color="warning" onClick={deleteOfficeHours}>Delete</Button>{' '}
        <Button color="secondary" onClick={toggle}>Exit</Button>
      </ModalFooter>
    </Modal>
  );
};

AddOrEditOrDeleteOfficeHoursModal.defaultProps = defaultProps;
AddOrEditOrDeleteOfficeHoursModal.propTypes = propTypes;

export default AddOrEditOrDeleteOfficeHoursModal;
