import React from 'react';
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
  toggleClose: PropTypes.func.isRequired,
  headerTextColor: PropTypes.string.isRequired,
  moduleOffsetNumber: PropTypes.string.isRequired
};

const AddOrEditModuleModal = ({
  isOpen,
  toggleClose,
  headerTextColor,
  moduleOffsetNumber
}) => {
  const edit = false; // still needs to implement the edit portion of this

  return (
    <Modal isOpen={isOpen} toggle={toggleClose} size="md">
      <ModalHeader className={headerTextColor} toggle={toggleClose}>
        No module, add one?
      </ModalHeader>
      <ModalBody style={{ height: 'auto' }}>
        <Form>
          <FormGroup row>
            <Label for="moduleName" sm={3}><b>Module name</b></Label>
            <Col sm={9}>
              <Input type="text" name="moduleName" id="moduleName" placeholder="Enter name" autoFocus />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleClose}>Add</Button>{' '}
        <Button color="secondary" onClick={toggleClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

AddOrEditModuleModal.propTypes = propTypes;

export default AddOrEditModuleModal;
