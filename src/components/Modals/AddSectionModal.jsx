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

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const AddSectionModal = ({ isOpen, toggle }) => {
  const [time, setTime] = useState('');

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md" autoFocus={false} centered>
      <ModalHeader toggle={toggle}>
        Too many students?
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="sectionName">Section Name</Label>
                <Input
                  type="text"
                  name="sectionName"
                  id="sectionName"
                  autoFocus
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="schedule">Schedule</Label>
                <Input
                  type="text"
                  name="schedule"
                  id="schedule"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm={4}>
              <FormGroup>
                <Label for="sectionType">Section Type</Label>
                <Input
                  type="select"
                  name="sectionType"
                  id="sectionType"
                >
                  <option></option>
                  <option>Lecture</option>
                  <option>Recitation</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label for="time">Time</Label>
                <Input
                  type="time"
                  name="time"
                  id="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button disabled color="primary" onClick={toggle}>Add</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

AddSectionModal.propTypes = propTypes;

export default AddSectionModal;
