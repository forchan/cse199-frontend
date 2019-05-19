import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CardLink
} from 'reactstrap';
import {
  displayNotification,
  SUCCESS,
  ERROR
} from '../../utils/NotificationUtils.js';
import {
  validateResponseString,
  replaceIfNull
} from '../../utils/StringUtils.js';
import { postApiStuff } from '../../utils/ApiUtils.js';
import { prepareDeleteMaterialsFromModuleForm } from '../../utils/FormUtils.js';
import { API_MATERIAL_URL } from '../../constants/ApiConstants.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  openedModule: PropTypes.object.isRequired,
  courseId: PropTypes.string.isRequired,
  reloadMaterials: PropTypes.func.isRequired
};

const DeleteMaterialModal = ({
  isOpen,
  toggle,
  material,
  openedModule,
  courseId,
  reloadMaterials
}) => {
  const validateResponse = response => {
    if (validateResponseString(response)) {
      reloadMaterials(courseId);
      displayNotification(response, SUCCESS);
      toggle();
    } else {
      displayNotification(replaceIfNull(response, 'Unknown error'), ERROR);
    }
  };

  const submitFormAndCloseModal = async () => {
    const formToSubmit = prepareDeleteMaterialsFromModuleForm({
      moduleName: openedModule.text,
      materialTitle: material.title,
      materialType: material.materials_type,
      courseId
    });
    const response = await postApiStuff(API_MATERIAL_URL, formToSubmit);
    validateResponse(response);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md" centered>
      <ModalHeader toggle={toggle}>
        Delete obstacle
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        Are you sure you want to delete this <b>{material.materials_type.toLowerCase()}</b>
        {' '}from <b>{openedModule.text}</b>?
        <p />
        <b>URL: </b>
        <CardLink href={material.url} target="_blank">
          {material.url}
        </CardLink>
        <p />
        Note: Unlike other deletes, this one will actually delete the material(s)
        from the database instead of changing material type to "deleted". It
        is recommended you save the URL somewhere if it is important.
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={submitFormAndCloseModal}>Delete</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteMaterialModal.propTypes = propTypes;

export default DeleteMaterialModal;
