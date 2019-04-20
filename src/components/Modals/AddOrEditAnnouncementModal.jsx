import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
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
import { LECTURE } from '../../constants/ScheduleConstants.js';
import { SEND_TO_ALL } from '../../constants/MaterialConstants.js';
import { API_MATERIAL_URL } from '../../constants/ApiConstants.js';
import { prepareAddOrEditAnnouncementForm } from '../../utils/FormUtils.js';
import { postApiStuff } from '../../utils/ApiUtils.js';

const defaultProps = {
  announcement: {},
  sentTo: ''
};

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired,
  sectionGroups: PropTypes.array.isRequired,
  sectionGroupNameToIdMap: PropTypes.object.isRequired,
  reloadAnnouncements: PropTypes.func.isRequired,
  announcement: PropTypes.object,
  sentTo: PropTypes.string
};

const AddOrEditAnnouncementModal = ({
  isOpen,
  toggle,
  courseId,
  sections,
  sectionGroups,
  lectureSectionNameToIdMap,
  sectionGroupNameToIdMap,
  reloadAnnouncements,
  announcement,
  sentTo
}) => {
  const edit = (announcement.materials_id) ? true : false;
  const [sendOption, setSendOption] = useState(sentTo);
  const [title, setTitle] = useState(replaceIfNull(announcement.title));
  const [text, setText] = useState(replaceIfNull(announcement.text));
  const [displayRequiredPrompt, setDisplayRequiredPrompt] = useState(false);
  const [didNotEditPrompt, setDidNotEditPrompt] = useState(false);
  const toggleSendOption = event => setSendOption(event.target.value);
  const handleTitleChange = event => setTitle(event.target.value);
  const handleTextChange = event => setText(event.target.value);
  const validForm = () => {
    if (isNullOrEmpty(title) || isNullOrEmpty(text)) {
      setDisplayRequiredPrompt(true);
      return false;
    };
    if (sendOption !== SEND_TO_ALL
        && !sectionGroupNameToIdMap.has(sendOption)
        && !lectureSectionNameToIdMap.has(sendOption)) {
      setDisplayRequiredPrompt(true);
      setDidNotEditPrompt(false);
      return false;
    };
    if (sendOption === sentTo && title === announcement.title && text === announcement.text) {
      setDidNotEditPrompt(true);
      setDisplayRequiredPrompt(false);
      return false;
    }
    setDisplayRequiredPrompt(false);
    setDidNotEditPrompt(false);
    return true;
  };
  const sendAnnouncement = async () => {
    if (!validForm()) return;
    const detailsObject = {
      text: text,
      title: title,
      courseId: courseId,
      materialsId: announcement.materials_id // will be null if not editing
    };
    if (sectionGroupNameToIdMap.has(sendOption)) {
      detailsObject['sectionGroupId'] = sectionGroupNameToIdMap.get(sendOption);
    }
    if (lectureSectionNameToIdMap.has(sendOption)) {
      detailsObject['sectionId'] = lectureSectionNameToIdMap.get(sendOption);
    }
    const formToSubmit = prepareAddOrEditAnnouncementForm(detailsObject);
    const response = await postApiStuff(API_MATERIAL_URL, formToSubmit);
    if (validateResponseString) {
      let successMessage = '';
      if (edit) {
        successMessage = 'Message updated!';
      } else {
        setSendOption('');
        setTitle('');
        setText('');
        successMessage = 'Message sent!';
      }
      reloadAnnouncements(courseId);
      displayNotification(successMessage, SUCCESS);
    } else {
      let errorMessage = replaceIfNull(response, 'Unknown error');
      displayNotification(errorMessage, ERROR);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-semi-lg" autoFocus={false}>
      <ModalHeader toggle={toggle}>
        What's on your mind?
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        {(displayRequiredPrompt) &&
          <p className="text-danger">Missing required* inputs</p>
        }
        {(didNotEditPrompt) &&
          <p className="text-danger">No changes made.</p>
        }
        <Form onSubmit={e => e.preventDefault()}>
          <FormGroup row>
            <Label for="sendOption" sm={2}><b>Send To</b></Label>
            <Col sm={4}>
              <Input
                type="select"
                name="sendOption"
                id="sendOption"
                value={sendOption}
                onChange={toggleSendOption}
              >
                <option>select one</option>
                <option>{SEND_TO_ALL}</option>
                {sectionGroups.map(sectionGroup => {
                  return (
                    <option key={sectionGroup.section_group_name}>
                      {sectionGroup.section_group_name}
                    </option>
                  );
                })}
                {sections
                  .filter(allSections => {
                    return allSections.section_type === LECTURE
                  })
                  .map(lectureSection => {
                    return (
                      <option key={lectureSection.section_name}>
                        {lectureSection.section_name}
                      </option>
                    );
                  })}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="title" sm={2}><b>Title</b></Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={handleTitleChange}
                autoFocus
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="message" sm={2}><b>Message</b></Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="message"
                id="message"
                value={text}
                onChange={handleTextChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={sendAnnouncement}>
          {(edit)
            ? <Fragment>Update</Fragment>
            : <Fragment>Send</Fragment>
          }
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

AddOrEditAnnouncementModal.defaultProps = defaultProps;
AddOrEditAnnouncementModal.propTypes = propTypes;

export default AddOrEditAnnouncementModal;
