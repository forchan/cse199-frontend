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
  const [materialType, setMaterialType] = useState('');
  const [materialFormat, setMaterialFormat] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialText, setMaterialText] = useState('');
  const [materialURL, setMaterialURL] = useState('');
  const [materialDescription, setMaterialDescription] = useState('');
  const [materialDueDate, setMaterialDueDate] = useState('');
  const courseId = openedModule.course_id;
  const sectionGroupId = openedModule.section_group_id; // null if intro module
  const materialStartDate = openedModule.date_start;
  const materialEndDate = openedModule.date_end;

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
          Summon obstacle for &nbsp;[{openedModule.text}]
        </ModalHeader>
        <ModalBody className='normal-height-modal-body'>
          <Form>
            <Row form>
              <Col sm={6}>
                <FormGroup>
                  <Label for="materialType">Material Type*</Label>
                  <Input
                    type="select"
                    name="materialType"
                    id="materialType"
                    value={materialType}
                    onChange={e => setMaterialType(e.target.value)}
                  >
                    <option></option>
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
                    value={materialFormat}
                    onChange={e => setMaterialFormat(e.target.value)}
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
                    value={materialStartDate}
                    disabled
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
                    value={materialEndDate}
                    disabled
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
                    value={materialDueDate}
                    onChange={e => setMaterialDueDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={materialTitle}
                    onChange={e => setMaterialTitle(e.target.value)}
                    autoFocus
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="text">Text</Label>
                  <Input
                    type="text"
                    name="text"
                    id="text"
                    value={materialText}
                    onChange={e => setMaterialText(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    value={materialDescription}
                    onChange={e => setMaterialDescription(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="url">URL</Label>
                  <Input
                    type="text"
                    name="url"
                    id="url"
                    value={materialURL}
                    onChange={e => setMaterialURL(e.target.value)}
                  />
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
