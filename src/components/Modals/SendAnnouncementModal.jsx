import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  Button,
  CardTitle,
  CardText,
  CardDeck,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class SendAnnouncementModal extends Component {
  render() {
    return (
      <Fragment>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="lg">
          <ModalHeader toggle={this.props.toggle}>
            What's on your mind?
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="title" sm={2}><b>Title</b></Label>
                <Col sm={10}>
                  <Input type="text" name="title" id="title" placeholder="Enter title" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="message" sm={2}><b>Message</b></Label>
                <Col sm={10}>
                  <Input type="textarea" name="message" id="message" placeholder="Enter message" />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button disabled color="primary" onClick={this.props.toggle}>Send</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

SendAnnouncementModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
}

export default SendAnnouncementModal;
