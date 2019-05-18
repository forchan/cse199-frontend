import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

const propTypes = {
  isOpen:  PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const AddOrEditOfficeHoursModal = ({
  isOpen,
  toggle
}) => {

  const validForm = () => {

  };

  const submitForm = async () => {

  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>
        Office Hours
      </ModalHeader>
      <ModalBody style={{ height: 'auto' }}>

      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Add</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

AddOrEditOfficeHoursModal.propTypes = propTypes;

export default AddOrEditOfficeHoursModal;
