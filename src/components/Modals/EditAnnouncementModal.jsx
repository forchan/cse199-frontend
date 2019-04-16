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
  toggle: PropTypes.func.isRequired
};

const EditAnnouncementModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md" autoFocus={false}>
      <ModalHeader toggle={toggle}>
        What should this do?
      </ModalHeader>
      <ModalBody style={{ height: 'auto' }}>
        How should editing announcements work in general?
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle} disabled>Do stuff</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

EditAnnouncementModal.propTypes = propTypes;

export default EditAnnouncementModal;
