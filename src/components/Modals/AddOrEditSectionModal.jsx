import React, { Fragment, useState } from 'react';
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
import { LECTURE, RECITATION } from '../../constants/ScheduleConstants.js';
import { replaceIfNull } from '../../utils/StringUtils.js';

const defaultProps = {
  section: {}
};

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  section: PropTypes.object
};

const AddOrEditSectionModal = ({ isOpen, toggle, section }) => {
  const edit = (section.section_id) ? true : false;
  const [sectionName, setSectionName] = useState(replaceIfNull(section.section_name));
  const [schedule, setSchedule] = useState(replaceIfNull(section.section_schedule));
  const [sectionType, setSectionType] = useState(replaceIfNull(section.section_type));
  const [time, setTime] = useState(replaceIfNull(section.section_time));
  const [location, setLocation] = useState(replaceIfNull(section.section_location));

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md" autoFocus={false} centered>
      <ModalHeader toggle={toggle}>
        {(edit)
          ? <Fragment>Edit section</Fragment>
          : <Fragment>Too many students?</Fragment>
        }
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
                  value={sectionName}
                  onChange={e => setSectionName(e.target.value)}
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
                  value={schedule}
                  onChange={e => setSchedule(e.target.value)}
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
                  value={sectionType}
                  onChange={e => setSectionType(e.target.vaue)}
                >
                  <option></option>
                  <option value={LECTURE}>Lecture</option>
                  <option value={RECITATION}>Recitation</option>
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
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button disabled color="primary" onClick={toggle}>
          {(edit)
            ? <Fragment>Save</Fragment>
            : <Fragment>Add</Fragment>
          }
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

AddOrEditSectionModal.defaultProps = defaultProps;
AddOrEditSectionModal.propTypes = propTypes;

export default AddOrEditSectionModal;
