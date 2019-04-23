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
import {
  ACTIVITY,
  ASSIGNMENT,
  LECTURE_NOTE
} from '../../constants/MaterialConstants.js';
import { replaceIfNull } from '../../utils/StringUtils.js';

const defaultProps = {
  material: {},
  openedModule: {}
};

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  openedModule: PropTypes.object,
  material: PropTypes.object
};

const AddOrEditMaterialModal = ({ isOpen, toggle, openedModule, material }) => {
  const edit = (material.materials_id) ? true : false;
  const courseId = (edit) ? material.course_id : openedModule.course_id;
  const sectionGroupId = (edit) ? material.section_group_id : openedModule.section_group_id; // null if intro module
  const materialStartDate = (edit) ? material.date_start : openedModule.date_start;
  const materialEndDate = (edit) ? material.date_end : openedModule.date_end;

  const [materialType, setMaterialType] = useState(replaceIfNull(material.materials_type));
  const [materialFormat, setMaterialFormat] = useState(replaceIfNull(material.materials_format));
  const [materialTitle, setMaterialTitle] = useState(replaceIfNull(material.title));
  const [materialText, setMaterialText] = useState(replaceIfNull(material.text));
  const [materialURL, setMaterialURL] = useState(replaceIfNull(material.url));
  const [materialDescription, setMaterialDescription] = useState(replaceIfNull(material.description));
  const [materialDueDate, setMaterialDueDate] = useState(replaceIfNull(material.due_date));

  return (
    <Fragment>
      <Modal className="modal-semi-lg" isOpen={isOpen} toggle={toggle} autoFocus={false} centered>
        <ModalHeader toggle={toggle}>
          {(edit)
            ? <Fragment>Edit obstacle</Fragment>
            : <Fragment>Summon obstacle for &nbsp;[{openedModule.text}]</Fragment>
          }
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
                    <option value={ACTIVITY}>Activity</option>
                    <option value={ASSIGNMENT}>Assignment</option>
                    <option value={LECTURE_NOTE}>Lecture Note</option>
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
          <Button disabled color="primary" onClick={toggle}>
            {(edit)
              ? <Fragment>Save</Fragment>
              : <Fragment>Add</Fragment>
            }
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

AddOrEditMaterialModal.defaultProps = defaultProps;
AddOrEditMaterialModal.propTypes = propTypes;

export default AddOrEditMaterialModal;
