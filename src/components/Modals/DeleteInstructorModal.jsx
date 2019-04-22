import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import { API_INSTRUCTOR_URL } from '../../constants/ApiConstants.js';
import {
  displayNotification,
  SUCCESS,
  ERROR
} from '../../utils/NotificationUtils.js';
import {
  validateResponseString,
  replaceIfNull
} from '../../utils/StringUtils.js';
import { postApiStuff } from '../../utils/ApiUtils.js';
import { prepareDeleteInstructorForm } from '../../utils/FormUtils.js';

const propTypes = {
  instructor: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  reloadInstructors: PropTypes.func.isRequired
};

const DeleteInstructorModal = ({ instructor, courseId, reloadInstructors, isOpen, toggle }) => {
  const validateResponse = response => {
    if (validateResponseString(response)) {
      const message = `${instructor.instructor_firstname} ${instructor.instructor_lastname} removed.`;
      displayNotification(message, SUCCESS);
      reloadInstructors(courseId);
      toggle();
    } else {
      let errorMessage = replaceIfNull(response, 'Unknown error')
      displayNotification(errorMessage, ERROR);
    }
  };

  const submitFormAndCloseModal = async () => {
    const formToSubmit = prepareDeleteInstructorForm(instructor);
    const response = await postApiStuff(API_INSTRUCTOR_URL, formToSubmit);
    validateResponse(response);
  };

  return (
    <Modal isOpen={isOpen} toggle={() => toggle()} size="md">
      <ModalHeader toggle={() => toggle()}>
        Boot instructor
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        Are you sure you want to delete <b>{instructor.instructor_firstname}{' '}
        {instructor.instructor_lastname}</b>?
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={submitFormAndCloseModal}>
          Delete
        </Button>
        <Button color="secondary" onClick={() => toggle()}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteInstructorModal.propTypes = propTypes;

export default DeleteInstructorModal;
