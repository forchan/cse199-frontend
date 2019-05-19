import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
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
import { postApiStuff } from '../../utils/ApiUtils.js';
import { prepareDeleteInstructorFromSectionForm } from '../../utils/FormUtils.js';
import { API_INSTRUCTOR_URL } from '../../constants/ApiConstants.js';


const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  instructor: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  courseId: PropTypes.string.isRequired,
  sectionGroups: PropTypes.array.isRequired,
  loadAllSectionGroupInstructors: PropTypes.func.isRequired
};

const DeleteSectionInstructorModal = ({
  isOpen,
  toggle,
  instructor,
  section,
  courseId,
  sectionGroups,
  loadAllSectionGroupInstructors
}) => {
  const validateResponse = response => {
    if (validateResponseString(response)) {
      const message = `${instructor.instructor_firstname} ${instructor.instructor_lastname}
        removed from section ${section.section_type} ${section.section_name}`;
      loadAllSectionGroupInstructors(courseId, sectionGroups);
      displayNotification(message, SUCCESS);
      toggle();
    } else {
      displayNotification(replaceIfNull(response, 'Unknown error'), ERROR);
    }
  };

  const submitFormAndCloseModal = async () => {
    const formToSubmit = prepareDeleteInstructorFromSectionForm(instructor);
    const response = await postApiStuff(API_INSTRUCTOR_URL, formToSubmit);
    validateResponse(response);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md" centered>
      <ModalHeader toggle={toggle}>
        Delete section instructor
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        Are you sure you want to delete{' '}
        <b>{instructor.instructor_firstname} {instructor.instructor_lastname}</b>{' '}
        from <b>{section.section_type} {section.section_name}</b>?
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={submitFormAndCloseModal}>Delete</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteSectionInstructorModal.propTypes = propTypes;

export default DeleteSectionInstructorModal;
