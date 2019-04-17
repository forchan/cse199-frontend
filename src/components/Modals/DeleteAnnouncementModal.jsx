import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Jumbotron
} from 'reactstrap';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const EditAnnouncementModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-semi-lg" autoFocus={false}>
      <ModalHeader toggle={toggle}>
        What should this do?
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        <Jumbotron>
          How should editing announcements work in general- besides flagging expired?
        </Jumbotron>
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
