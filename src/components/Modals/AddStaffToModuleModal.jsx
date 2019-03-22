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

class AddStaffToModuleModal extends Component {
  render() {
    return (
      <Fragment>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="md" autoFocus={false} centered>
          <ModalHeader toggle={this.props.toggle}>
            Assign staff to this module
          </ModalHeader>
          <ModalBody style={{ height: 'auto' }}>
            <Form>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="placeholder">Form goes here @_@</Label>
                    <Input type="text" name="placeholder" id="placeholder" placeholder="some input" disabled />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button disabled color="info" onClick={this.props.toggle}>Assign</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

AddStaffToModuleModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
}

export default AddStaffToModuleModal;
