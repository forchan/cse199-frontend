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
  material: PropTypes.object.isRequired
};

const DeleteMaterialModal = ({
  isOpen,
  toggle,
  material
}) => {

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md" centered>
      <ModalHeader toggle={toggle}>
        Delete obstacle
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        Are you sure you want to delete this {material.materials_type.toLowerCase()}?
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={toggle} disabled>Delete</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteMaterialModal.propTypes = propTypes;

export default DeleteMaterialModal;
