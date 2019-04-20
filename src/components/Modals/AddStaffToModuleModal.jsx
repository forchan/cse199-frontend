import React, { Fragment } from 'react';
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
import { isNullOrEmpty } from '../../utils/StringUtils.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  instructors: PropTypes.array.isRequired,
  openedModule: PropTypes.object.isRequired
};

const AddStaffToModuleModal = ({ isOpen, toggle, instructors, openedModule }) => {

  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={toggle} size="md" autoFocus={false} centered>
        <ModalHeader toggle={toggle}>
          Requesting backup
        </ModalHeader>
        <ModalBody className='normal-height-modal-body'>
          <Form onSubmit={e => e.preventDefault()}>
            <FormGroup row>
              <Label for="selectInstructor" sm={3}><b>Select Staff</b></Label>
              <Col>
                <Input
                  type="select"
                  name="selectInstructor"
                  id="selectInstructor"
                >
                  <option>select one</option>
                  {instructors.map(instructor => {
                    const {
                      instructor_id,
                      instructor_firstname,
                      instructor_lastname,
                      instructor_contact
                    } = instructor;
                    const email = (isNullOrEmpty(instructor_contact)) ? '' : `(${instructor_contact})`;
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
        </ModalBody>
        <ModalFooter>
          <Button disabled color="info" onClick={toggle}>Assign</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

AddStaffToModuleModal.propTypes = propTypes;

export default AddStaffToModuleModal;
