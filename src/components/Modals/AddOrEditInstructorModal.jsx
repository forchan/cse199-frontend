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
import {
  displayNotification,
  SUCCESS,
  ERROR
} from '../../utils/NotificationUtils.js';
import {
  validateResponseString,
  isNullOrEmpty,
  replaceIfNull
} from '../../utils/StringUtils.js';
import { postApiStuff } from '../../utils/ApiUtils.js';
import { prepareAddOrEditInstructorForm } from '../../utils/FormUtils.js';
import { API_INSTRUCTOR_URL } from '../../constants/ApiConstants.js';

const defaultProps = {
  edit: false,
  instructor: {}
};

const propTypes = {
  instructor: PropTypes.object,
  edit: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  reloadInstructors: PropTypes.func.isRequired,
  currentInstructors: PropTypes.array.isRequired
};

class AddOrEditInstructorModal extends Component {
  componentWillMount = () => {
    const { edit, instructor } = this.props;

    if (edit) {
      // do some replace if nulls here, but also discuss standardizing data
      const title = replaceIfNull(instructor.instructor_title);
      const email = replaceIfNull(instructor.instructor_contact);
      const photoURL = replaceIfNull(instructor.instructor_picture_url);
      this.setState({
        title: title,
        firstName: instructor.instructor_firstname,
        lastName: instructor.instructor_lastname,
        type: instructor.instructor_type,
        email: email,
        photoURL: photoURL,
        displayRequiredPrompt: false,
        displayDuplicateEmailPrompt: false,
        instructorId: instructor.instructor_id
      });
    } else {
      this.newForm();
    }
  };

  newForm = () => { // this is the initial state of this component / form
    this.setState({
      title: '',
      firstName: '',
      lastName: '',
      type: '',
      email: '',
      photoURL: '',
      displayRequiredPrompt: false,
      displayDuplicateEmailPrompt: false,
    });
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validForm = () => { // returns true if form is valid
    const { firstName, lastName, type, email } = this.state;
    const { currentInstructors, instructor  } = this.props;
    // required info
    if (isNullOrEmpty(firstName)
        || isNullOrEmpty(lastName)
        || isNullOrEmpty(type)
        || isNullOrEmpty(email)) {
      this.setState({ displayRequiredPrompt: true });
      return false;
    }
    // duplicate emails are not allowed
    const matchingInstructor = currentInstructors.find(current => (
      current.instructor_contact === email
      && current.instructor_id !== instructor.instructor_id
    ));
    if (matchingInstructor) {
      this.setState({ displayDuplicateEmailPrompt: true });
      return false;
    }
    this.setState({
      displayRequiredPrompt: false,
      displayDuplicateEmailPrompt: false
    });
    return true;
  };

  submitForm = async () => {
    if (!this.validForm()) return;
    const formToSubmit = prepareAddOrEditInstructorForm(this.state);
    const response = await postApiStuff(API_INSTRUCTOR_URL, formToSubmit);
    this.validateResponse(response);
  };

  validateResponse = response => {
    const { courseId, edit, reloadInstructors } = this.props;

    if (validateResponseString(response)) {
      if (!edit) {
        this.newForm();
      }
      reloadInstructors(courseId);
      displayNotification(response, SUCCESS);
    } else {
      let errorMessage = replaceIfNull(response, 'Unknown error');
      if (edit) {
        errorMessage += ' (you may not have made any changes).';
      }
      displayNotification(errorMessage, ERROR);
    }
  };

  submitFormAndCloseModal = async () => {
    await this.submitForm();
    if (!this.state.displayRequiredPrompt && !this.state.displayDuplicateEmailPrompt) {
      this.props.toggle();
    }
  };

  handleToggle = () => {
    this.newForm();
    this.props.toggle();
  };

  render() {
    const { isOpen, edit } = this.props;
    const {
      title,
      firstName,
      lastName,
      type,
      email,
      photoURL,
      displayRequiredPrompt,
      displayDuplicateEmailPrompt
    } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={this.handleToggle} size="md" autoFocus={false}>
        <ModalHeader toggle={this.handleToggle}>
          {(edit)
            ? <Fragment>Edit instructor</Fragment>
            : <Fragment>Who's the new guy?</Fragment>
          }
        </ModalHeader>
        <ModalBody className='normal-height-modal-body'>
          {(displayRequiredPrompt) &&
            <p className="text-danger">Missing required* inputs</p>
          }
          {(displayDuplicateEmailPrompt) &&
            <p className="text-danger">
              This email already exists, emails must be unique.
            </p>
          }
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
                  <Label for="firstName">First Name<b>*</b></Label>
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
                  <Label for="lastName">Last Name<b>*</b></Label>
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
                  <Label for="email">Email<b>*</b></Label>
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
          {(edit)
            ? <Button color="primary" onClick={this.submitForm}>
                Update
              </Button>
            : <Fragment>
                <Button color="primary" onClick={this.submitForm}>
                  Add
                </Button>{' '}
                <Button color="info" onClick={this.submitFormAndCloseModal}>
                  Add/Close
                </Button>
              </Fragment>
          }{' '}
          <Button color="secondary" onClick={this.handleToggle}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  };
};

AddOrEditInstructorModal.defaultProps = defaultProps;
AddOrEditInstructorModal.propTypes = propTypes;

export default AddOrEditInstructorModal;
