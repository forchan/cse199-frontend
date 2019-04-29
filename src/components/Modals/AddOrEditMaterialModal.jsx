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
import { prepareAddMaterialToModuleForm } from '../../utils/FormUtils.js';
import {
  ACTIVITY,
  ASSIGNMENT,
  LECTURE_NOTE
} from '../../constants/MaterialConstants.js';
import { API_MATERIAL_URL } from '../../constants/ApiConstants.js';


const defaultProps = {
  material: {},
  openedModule: {}
};

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  openedModule: PropTypes.object,
  material: PropTypes.object,
  courseId: PropTypes.string.isRequired,
  reloadMaterials: PropTypes.func.isRequired
};

const AddOrEditMaterialModal = ({
  isOpen,
  toggle,
  openedModule,
  material,
  courseId,
  reloadMaterials
}) => {
  const edit = (material.materials_id) ? true : false;
  const moduleName = openedModule.text;
  const materialStartDate = (edit) ? material.date_start : openedModule.date_start;
  const materialEndDate = (edit) ? material.date_end : openedModule.date_end;

  const [materialType, setMaterialType] = useState(replaceIfNull(material.materials_type));
  const [materialFormat, setMaterialFormat] = useState(replaceIfNull(material.materials_format));
  const [materialTitle, setMaterialTitle] = useState(replaceIfNull(material.title));
  const [materialText, setMaterialText] = useState(replaceIfNull(material.text));
  const [materialURL, setMaterialURL] = useState(replaceIfNull(material.url));
  const [materialDescription, setMaterialDescription] = useState(replaceIfNull(material.description));
  const [materialDueDate, setMaterialDueDate] = useState(replaceIfNull(material.due_date));

  const [displayRequiredPrompt, setDisplayRequiredPrompt] = useState(false);

  const validForm = () => {
    if (isNullOrEmpty(materialType) || isNullOrEmpty(materialTitle) || isNullOrEmpty(materialURL)) {
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validForm()) {
      setDisplayRequiredPrompt(true);
      return;
    }
    setDisplayRequiredPrompt(false);
    const formToSubmit = prepareAddMaterialToModuleForm({
      courseId,
      moduleName,
      materialType,
      materialTitle,
      materialURL,
      materialText,
      materialDescription,
      materialFormat,
      materialDueDate
    });
    const response = await postApiStuff(API_MATERIAL_URL, formToSubmit);
    if (validateResponseString(response)) {
      setMaterialType('');
      setMaterialTitle('');
      setMaterialURL('');
      setMaterialText('');
      setMaterialDescription('');
      setMaterialFormat('');
      setMaterialDueDate('');
      reloadMaterials(courseId);
      displayNotification(`Material added to ${moduleName}!`, SUCCESS);
    } else {
      displayNotification(replaceIfNull(response, 'Unknown error'), ERROR);
    }
  };

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
          {(displayRequiredPrompt) &&
            <p className="text-danger">Missing required* inputs</p>
          }
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
                  <Label for="title">Title*</Label>
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
                  <Label for="url">URL*</Label>
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
          {(edit)
            ? <Button color="primary" onClick={submitForm} disabled><Fragment>Save</Fragment></Button>
            : <Button color="primary" onClick={submitForm}><Fragment>Add</Fragment></Button>
          }
          {' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

AddOrEditMaterialModal.defaultProps = defaultProps;
AddOrEditMaterialModal.propTypes = propTypes;

export default AddOrEditMaterialModal;
