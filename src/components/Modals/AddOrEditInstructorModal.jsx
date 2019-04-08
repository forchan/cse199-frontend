import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer } from 'react-notifications';
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
import {
  POST_INSTRUCTOR,
  API_INSTRUCTOR_URL
} from '../../constants/ApiConstants.js';
import {
  createNotification,
  SUCCESS,
  ERROR
} from '../../utils/NotificationUtils.js';
import { postApiStuff, validateResponse } from '../../utils/ApiUtils.js';
import { isNullOrEmpty, replaceIfNull } from '../../utils/StringUtils.js';

const defaultProps = {
  edit: false
};

const propTypes = {
  instructorId: PropTypes.number,
  edit: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

class AddOrEditInstructorModal extends Component {
  componentWillMount = () => {
    this.newForm();
  };

  newForm = () => { // this is the initial state of this component / form
    this.setState({
      title: '',
      firstName: '',
      lastName: '',
      type: '',
      email: '',
      photoURL: '',
      displayRequiredPrompt: false
    });
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  prepareFormToSubmit = () => {
    const { title, firstName, lastName, type, email, photoURL } = this.state;
    const { edit, instructorId } = this.props;

    // these key values are what the API expects as the json payload
    const formToSubmit = {
      action: POST_INSTRUCTOR,
      instructortype: type,
      instructortitle: title,
      instructorfirstname: firstName,
      instructorlastname: lastName,
      instructorcontact: email,
      instructorpicture: photoURL,
    };

    if (edit) {
      formToSubmit['instructorid'] = instructorId;
    }

    return formToSubmit;
  }

  invalidForm = () => {
    const { firstName, lastName, type } = this.state;
    if (isNullOrEmpty(firstName) || isNullOrEmpty(lastName) || isNullOrEmpty(type)) {
      return true;
    }
    return false;
  }

  submitForm = async () => {
    if (this.invalidForm()) {
      this.setState({ displayRequiredPrompt: true });
      return;
    }

    this.setState({ displayRequiredPrompt: false });

    const formToSubmit = this.prepareFormToSubmit();
    const response = await postApiStuff(API_INSTRUCTOR_URL, formToSubmit);

    if (validateResponse(response)) {
      this.newForm();
      this.displayNotification(response, SUCCESS);
    } else {
      this.displayNotification(replaceIfNull(response, 'Unknown error'), ERROR);
    }
  };

  handleToggle = () => {
    this.newForm();
    this.props.toggle();
  };

  displayNotification = (message, type) => {
    const displayFunction = createNotification(message, type);
    displayFunction();
  };

  render() {
    const { isOpen } = this.props;
    const { title, firstName, lastName, type, email, photoURL, displayRequiredPrompt } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={this.handleToggle} size="md" autoFocus={false}>
        <NotificationContainer />
        <ModalHeader toggle={this.handleToggle}>
          Who's the new guy?
        </ModalHeader>
        <ModalBody style={{ height: 'auto' }}>
          {displayRequiredPrompt && <p className="text-danger">Missing required* inputs</p>}
          <Form>
            <Row form>
              <Col sm={3}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="select"
                    name="title"
                    id="title"
                    value={title}
                    onChange={this.handleFormChange}
                  >
                    <option></option>
                    <option>Dr.</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormGroup>
                  <Label for="firstName">First name<b>*</b></Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoFocus
                    value={firstName}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={3} />
              <Col md={9}>
                <FormGroup>
                  <Label for="lastName">Last name<b>*</b></Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={3}>
                <FormGroup>
                  <Label for="type">Instructor Type<b>*</b></Label>
                  <Input
                    type="select"
                    name="type"
                    id="type"
                    value={type}
                    onChange={this.handleFormChange}
                  >
                    <option></option>
                    <option>INSTRUCTOR</option>
                    <option>TA</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="photoURL">Photo URL</Label>
                  <Input
                    type="text"
                    name="photoURL"
                    id="photoURL"
                    value={photoURL}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.submitForm}>Add</Button>{' '}
          <Button color="secondary" onClick={this.handleToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

AddOrEditInstructorModal.defaultProps = defaultProps;
AddOrEditInstructorModal.propTypes = propTypes;

export default AddOrEditInstructorModal;
