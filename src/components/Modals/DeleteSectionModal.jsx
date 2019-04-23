import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired
};

const DeleteSectionModal = ({
  isOpen,
  toggle,
  section
}) => {

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md" autoFocus={false}>
      <ModalHeader toggle={toggle}>
        Delete section
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        <p>Are you sure you want to delete <b>{section.section_type} {section.section_name}</b>?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={toggle} disabled>Delete</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteSectionModal.propTypes = propTypes;

export default DeleteSectionModal;
