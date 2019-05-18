import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import {
  displayNotification,
  SUCCESS,
  ERROR
} from '../../utils/NotificationUtils.js';
import {
  validateResponseString,
  replaceIfNull,
  isNullOrEmpty
} from '../../utils/StringUtils.js';
import { postApiStuff } from '../../utils/ApiUtils.js';
import { prepareAddModuleForm } from '../../utils/FormUtils.js';
import { API_MATERIAL_URL } from '../../constants/ApiConstants.js';

const propTypes = {
  isOpen:  PropTypes.bool.isRequired,
  toggleClose: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  headerTextColor: PropTypes.string.isRequired,
  moduleOffsetNumber: PropTypes.string.isRequired,
  reloadModules: PropTypes.func.isRequired
};

const AddOrEditModuleModal = ({
  isOpen,
  toggleClose,
  courseId,
  headerTextColor,
  moduleOffsetNumber,
  reloadModules
}) => {
  const edit = false; // still needs to implement the edit portion of this
  const [moduleName, setModuleName] = useState('');
  const [displayRequiredPrompt, setDisplayRequiredPrompt] = useState(false);

  const validForm = () => {
    if (isNullOrEmpty(moduleName)) {
      setDisplayRequiredPrompt(true);
      return false;
    }
    setDisplayRequiredPrompt(false);
    return true;
  };

  const addModule = async () => {
    if (!validForm()) return;
    const formToSubmit = prepareAddModuleForm({
      courseId,
      moduleOffsetNumber,
      moduleName
    });
    const response = await postApiStuff(API_MATERIAL_URL, formToSubmit);
    if (validateResponseString(response)) {
      displayNotification('Module created!', SUCCESS);
      reloadModules(courseId);
      toggleClose();
    } else {
      displayNotification(replaceIfNull(response, 'Unknown error'), ERROR);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleClose} size="md" autoFocus={false}>
      <ModalHeader className={headerTextColor} toggle={toggleClose}>
        No module, add one?
      </ModalHeader>
      <ModalBody style={{ height: 'auto' }}>
        {(displayRequiredPrompt) &&
          <p className="text-danger">Missing module name*</p>
        }
        <Form onSubmit={e => e.preventDefault()}>
          <FormGroup row>
            <Label for="moduleName" sm={3}><b>Module name</b></Label>
            <Col sm={9}>
              <Input
                type="text"
                name="moduleName"
                id="moduleName"
                placeholder="Enter module name"
                value={moduleName}
                onChange={e => setModuleName(e.target.value)}
                autoFocus
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={addModule}>Add</Button>{' '}
        <Button color="secondary" onClick={toggleClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

AddOrEditModuleModal.propTypes = propTypes;

export default AddOrEditModuleModal;
