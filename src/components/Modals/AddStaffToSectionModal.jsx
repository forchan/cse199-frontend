import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
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
import { prepareAddInstructorToSectionForm } from '../../utils/FormUtils.js';
import { postApiStuff } from '../../utils/ApiUtils.js';
import { API_INSTRUCTOR_URL } from '../../constants/ApiConstants.js';

const defaultProps = {
  instructors: [],
  openedSection: {}
};

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  instructors: PropTypes.array.isRequired,
  openedSection: PropTypes.object.isRequired,
  courseId: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  sectionGroups: PropTypes.array.isRequired,
  loadAllSectionGroupInstructors: PropTypes.func.isRequired
};

const AddStaffToSectionModal = ({
  isOpen,
  toggle,
  instructors,
  openedSection,
  courseId,
  startDate,
  endDate,
  sectionGroups,
  loadAllSectionGroupInstructors
}) => {
  const [selectedInstructor, setInstructor] = useState('');
  const [displayRequiredPrompt, setDisplayRequiredPrompt] = useState(false);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const closeModal = () => {
    toggle();
    setInstructor('');
    setDisplayConfirmation(false);
    setDisplayRequiredPrompt(false);
  };
  const toggleConfirmation = () => {
    if (isNullOrEmpty(selectedInstructor)) {
      setDisplayRequiredPrompt(true);
      return;
    }
    setDisplayRequiredPrompt(false);
    setDisplayConfirmation(!displayConfirmation);
  };
  const selectedInstructorName = () => {
    const targetInstructor = instructors.filter(instructor =>
      instructor.instructor_id === selectedInstructor
    );
    if (targetInstructor.length < 1) return '';
    const firstName = targetInstructor[0].instructor_firstname;
    const lastName = targetInstructor[0].instructor_lastname;
    return firstName + ' ' + lastName;
  };
  const assignInstructor = async () => {
    const formToSubmit = prepareAddInstructorToSectionForm(
      selectedInstructor,
      openedSection.section_id,
      startDate,
      endDate
    );
    const response = await postApiStuff(API_INSTRUCTOR_URL, formToSubmit);

    if (validateResponseString(response)) {
      displayNotification('Staff added to section!', SUCCESS);
      loadAllSectionGroupInstructors(courseId, sectionGroups);
      closeModal();
    } else {
      let errorMessage = replaceIfNull(response, 'Unknown error');
      displayNotification(errorMessage, ERROR);
    }
  };

  const confirmationPrompt = (
    <p>Are you sure you want to assign <b>{selectedInstructorName()}</b> to&nbsp;
    <b>{openedSection.section_type} {openedSection.section_name}</b>?</p>
  );

  const form = (
    <Form onSubmit={e => e.preventDefault()}>
      <FormGroup row>
        <Label for="selectInstructor" sm={3}><b>Select Staff</b></Label>
        <Col>
          <Input
            type="select"
            name="selectInstructor"
            id="selectInstructor"
            value={selectedInstructor}
            onChange={e => setInstructor(e.target.value)}
          >
            <option></option>
            {instructors.map(instructor => {
              const {
                instructor_id,
                instructor_firstname,
                instructor_lastname,
                instructor_contact
              } = instructor;
              const email = (isNullOrEmpty(instructor_contact))
                ? ''
                : `(${instructor_contact})`;
              return (
                <option value={instructor_id} key={instructor_id}>
                  {instructor_firstname} {instructor_lastname} {email}
                </option>
              );
            })}
          </Input>
        </Col>
      </FormGroup>
    </Form>
  );

  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={closeModal} size="md" centered>
        <ModalHeader toggle={closeModal}>
          Requesting backup
        </ModalHeader>
        <ModalBody className='normal-height-modal-body'>
          {(displayRequiredPrompt) &&
            <p className="text-danger">No staff member selected*</p>
          }
          {(displayConfirmation)
            ? confirmationPrompt
            : form
          }
        </ModalBody>
        <ModalFooter>
          {(displayConfirmation)
            ? <Button color="info" onClick={assignInstructor}>Yes</Button>
            : <Button color="info" onClick={toggleConfirmation}>Assign</Button>
          }{' '}
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

AddStaffToSectionModal.defaultProps = defaultProps;
AddStaffToSectionModal.propTypes = propTypes;

export default AddStaffToSectionModal;
