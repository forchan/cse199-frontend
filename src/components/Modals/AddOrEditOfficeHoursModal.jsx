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
import { REG_OFFICE_HOUR_TYPE } from '../../constants/InstructorConstants.js';

const propTypes = {
  isOpen:  PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const AddOrEditOfficeHoursModal = ({
  isOpen,
  toggle
}) => {
  const [weekday, setWeekday] = useState('');
  const [location, setLocation] = useState('');
  const [officeHourType, setOfficeHourType] = useState(REG_OFFICE_HOUR_TYPE);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const validForm = () => {
    return true;
  };

  const submitForm = async () => {
    if (!validForm()) return;
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>
        Office Hours
      </ModalHeader>
      <ModalBody style={{ height: 'auto' }}>
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
                  value={officeHourType}
                  onChange={e => setOfficeHourType(e.target.value)}
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
        <Button color="primary" onClick={submitForm}>Add</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

AddOrEditOfficeHoursModal.propTypes = propTypes;

export default AddOrEditOfficeHoursModal;
