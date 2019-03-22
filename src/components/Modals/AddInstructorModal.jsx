import React, { Component, Fragment } from 'react';
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

class AddInstructorModal extends Component {
  render() {
    return (
      <Fragment>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="md" autoFocus={false}>
          <ModalHeader toggle={this.props.toggle}>
            Who's the new guy?
          </ModalHeader>
          <ModalBody style={{ height: 'auto' }}>
            <Form>
              <Row form>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="select" name="title" id="title">
                      <option>select</option>
                      <option>Dr.</option>
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Label for="firstname">First name</Label>
                    <Input type="text" name="firstname" id="firstname" autoFocus />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col sm={3} />
                <Col md={9}>
                  <FormGroup>
                    <Label for="lastname">Last name</Label>
                    <Input type="text" name="lastname" id="lastname" />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="instructorType">Instructor Type</Label>
                    <Input type="select" name="instructorType" id="instructorType">
                      <option>select</option>
                      <option>Instructor</option>
                      <option>TA</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="photoURL">Photo URL</Label>
                    <Input type="text" name="photoURL" id="photoURL" />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button disabled color="primary" onClick={this.props.toggle}>Add</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

AddInstructorModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
}

export default AddInstructorModal;
