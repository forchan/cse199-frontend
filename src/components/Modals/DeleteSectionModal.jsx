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
import { prepareDeleteSectionForm } from '../../utils/FormUtils.js';
import { API_SECTION_URL } from '../../constants/ApiConstants.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  courseId: PropTypes.string.isRequired,
  reloadSections: PropTypes.func.isRequired
};

const DeleteSectionModal = ({
  isOpen,
  toggle,
  section,
  courseId,
  reloadSections
}) => {
  const validateResponse = response => {
    if (validateResponseString(response)) {
      const message = `${section.section_type} ${section.section_name} deleted.`;
      displayNotification(message, SUCCESS);
      reloadSections(courseId);
      toggle();
    } else {
      let errorMessage = replaceIfNull(response, 'Unknown error')
      displayNotification(errorMessage, ERROR);
    }
  };

  const submitFormAndCloseModal = async () => {
    const formToSubmit = prepareDeleteSectionForm(section);
    const response = await postApiStuff(API_SECTION_URL, formToSubmit);
    validateResponse(response);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md" centered>
      <ModalHeader toggle={toggle}>
        Delete section
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        Are you sure you want to delete <b>{section.section_type} {section.section_name}</b>?
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={submitFormAndCloseModal}>Delete</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteSectionModal.propTypes = propTypes;

export default DeleteSectionModal;
