import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody
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
import { prepareDeleteAnnouncementForm } from '../../utils/FormUtils.js';
import { API_MATERIAL_URL } from '../../constants/ApiConstants.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  reloadAnnouncements: PropTypes.func.isRequired,
  announcement: PropTypes.object.isRequired,
  sentTo: PropTypes.string.isRequired
};

const DeleteAnnouncementModal = ({
  isOpen,
  toggle,
  courseId,
  announcement,
  reloadAnnouncements,
  sentTo
}) => {
  const validateResponse = response => {
    if (validateResponseString(response)) {
      const message = `Announcement "${announcement.title}" removed.`;
      displayNotification(message, SUCCESS);
      reloadAnnouncements(courseId);
      toggle();
    } else {
      let errorMessage = replaceIfNull(response, 'Unknown error')
      displayNotification(errorMessage, ERROR);
    }
  };

  const submitFormAndCloseModal = async () => {
    const formToSubmit = prepareDeleteAnnouncementForm(announcement);
    const response = await postApiStuff(API_MATERIAL_URL, formToSubmit);
    validateResponse(response);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-semi-lg">
      <ModalHeader toggle={toggle}>
        Undo message
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        <p>Are you sure you want to delete this message?</p>
        <Card>
          <CardBody>
            <CardTitle>
              <b>Sent to:</b> {sentTo}
            </CardTitle>
            <CardSubtitle>
              <b>Title:</b> {announcement.title}
            </CardSubtitle>
            <CardText>
              <b>Message:</b> {announcement.text}
            </CardText>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={submitFormAndCloseModal}>Delete</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteAnnouncementModal.propTypes = propTypes;

export default DeleteAnnouncementModal;
