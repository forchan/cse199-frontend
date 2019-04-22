import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  openedModule: PropTypes.object.isRequired
};

const AddMaterialModal = ({ isOpen, toggle, openedModule }) => {

  return (
    <Fragment>
      <Modal
        className="modal-semi-lg"
        isOpen={isOpen}
        toggle={toggle}
        autoFocus={false}
        centered
      >
        <ModalHeader toggle={toggle}>
          Summon obstacle for {openedModule.text}
        </ModalHeader>
        <ModalBody className='normal-height-modal-body'>
          <Form>
            <Row form>
              <Col sm={6}>
                <FormGroup>
                  <Label for="materialsType">Material Type</Label>
                  <Input
                    type="select"
                    name="materialsType"
                    id="materialsType"
                  >
                    <option>select one</option>
                    <option>Activity</option>
                    <option>Assignment</option>
                    <option>Lecture Note</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="format">Material Format</Label>
                  <Input
                    type="text"
                    name="format"
                    id="format"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={4}>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="endDate">End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="dueDate">Due Date</Label>
                  <Input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" autoFocus />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="text">Text</Label>
                  <Input type="text" name="text" id="text" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="text" name="description" id="description" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="url">URL</Label>
                  <Input type="text" name="url" id="url" />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button disabled color="primary" onClick={toggle}>Add</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

AddMaterialModal.propTypes = propTypes;

export default AddMaterialModal;
