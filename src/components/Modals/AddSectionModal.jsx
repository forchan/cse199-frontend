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

class AddSectionModal extends Component {
  render() {
    return (
      <Fragment>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="md" autoFocus={false} centered>
          <ModalHeader toggle={this.props.toggle}>
            Too many students?
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
            <Button disabled color="primary" onClick={this.props.toggle}>Add</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

AddSectionModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
}

export default AddSectionModal;
