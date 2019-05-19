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
import {
  displayNotification,
  SUCCESS,
  ERROR
} from '../../utils/NotificationUtils.js';
import {
  validateResponseString,
  isNullOrEmpty,
  replaceIfNull
} from '../../utils/StringUtils.js';
import { postApiStuff } from '../../utils/ApiUtils.js';
import { prepareAddOrEditSectionForm } from '../../utils/FormUtils.js';
import { API_SECTION_URL } from '../../constants/ApiConstants.js';
import { LECTURE, RECITATION } from '../../constants/ScheduleConstants.js';

const defaultProps = {
  section: {},
  sectionGroup: {}
};

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  section: PropTypes.object, // only required if editing
  sectionGroup: PropTypes.object, // only required if adding new
  reloadSections: PropTypes.func.isRequired
};

const AddOrEditSectionModal = ({
  isOpen,
  toggle,
  courseId,
  section,
  sectionGroup,
  reloadSections
}) => {
  const edit = (section.section_id) ? true : false;
  const [sectionName, setSectionName] = useState(replaceIfNull(section.section_name));
  const [sectionSchedule, setSectionSchedule] = useState(replaceIfNull(section.section_schedule));
  const [sectionType, setSectionType] = useState(replaceIfNull(section.section_type));
  const [sectionTime, setSectionTime] = useState(replaceIfNull(section.section_time));
  const [sectionLocation, setSectionLocation] = useState(replaceIfNull(section.section_location));
  const [displayRequiredPrompt, setDisplayRequiredPrompt] = useState(false);
  const clearAllInput = () => {
    setSectionName('');
    setSectionSchedule('');
    setSectionType('');
    setSectionTime('');
    setSectionLocation('');
  };

  const createDetailsObject = () => {
    const detailsObject = {
      courseId,
      sectionName,
      sectionSchedule,
      sectionType,
      sectionTime,
      sectionLocation
    };
    if (edit) {
      detailsObject['sectionId'] = section.section_id;
    } else {
      detailsObject['sectionGroupId'] = sectionGroup.sg_id;
    }
    return detailsObject;
  };

  const validForm = () => {
    if (isNullOrEmpty(sectionName)
      || isNullOrEmpty(sectionSchedule)
      || isNullOrEmpty(sectionType)
      || isNullOrEmpty(sectionTime)
      || isNullOrEmpty(sectionLocation)) {
        return false;
      }
      return true;
  };

  const submitForm = async () => {
    if (!validForm()) {
      setDisplayRequiredPrompt(true);
      return;
    }
    setDisplayRequiredPrompt(false);
    const detailsObject = createDetailsObject();
    const formToSubmit = prepareAddOrEditSectionForm(detailsObject);
    const response = await postApiStuff(API_SECTION_URL, formToSubmit);
    if (validateResponseString(response)) {
      let successMessage = '';
      if (edit) {
        successMessage = `Updated section ${sectionName}`;
      } else {
        clearAllInput();
        successMessage = `Added section ${sectionName} to section group ${sectionGroup.section_group_name}`;
      }
      reloadSections(courseId);
      displayNotification(successMessage, SUCCESS);
    } else {
      displayNotification(replaceIfNull(response, 'Unknown error'), ERROR);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md" autoFocus={false} centered>
      <ModalHeader toggle={toggle}>
        {(edit)
          ? <Fragment>Edit section</Fragment>
          : <Fragment>Too many students?</Fragment>
        }
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        {(displayRequiredPrompt) &&
          <p className="text-danger">Missing required* inputs</p>
        }
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="sectionName">Section Name*</Label>
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
                <Label for="schedule">Schedule* [ex. M or T-R]</Label>
                <Input
                  type="text"
                  name="schedule"
                  id="schedule"
                  value={sectionSchedule}
                  onChange={e => setSectionSchedule(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm={4}>
              <FormGroup>
                <Label for="sectionType">Section Type*</Label>
                <Input
                  type="select"
                  name="sectionType"
                  id="sectionType"
                  value={sectionType}
                  onChange={e => setSectionType(e.target.value)}
                >
                  <option></option>
                  <option value={LECTURE}>Lecture</option>
                  <option value={RECITATION}>Recitation</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label for="time">Time*</Label>
                <Input
                  type="time"
                  name="time"
                  id="time"
                  value={sectionTime}
                  onChange={e => setSectionTime(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label for="location">Location*</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  value={sectionLocation}
                  onChange={e => setSectionLocation(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submitForm}>
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
