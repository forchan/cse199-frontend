import React, { useState } from 'react';
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
import { LECTURE } from '../../constants/ScheduleConstants.js';
import { TO_ALL } from '../../constants/AnnouncementConstants.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired,
  sectionGroups: PropTypes.array.isRequired,
  sectionGroupNameToIdMap: PropTypes.object.isRequired
};

const SendAnnouncementModal = ({
  isOpen,
  toggle,
  sections,
  sectionGroups,
  lectureSectionNameToIdMap,
  sectionGroupNameToIdMap
}) => {
  const [sendOption, setSendOption] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const toggleSendOption = event => setSendOption(event.target.value);
  const handleTitleChange = event => setTitle(event.target.value);
  const handleTextChange = event => setText(event.target.value);
  const sendAnnouncement = () => {
    if (sendOption === TO_ALL) {
      alert('to everyone');
    } else if (sectionGroupNameToIdMap.has(sendOption)) {
      alert('to section group ' + sectionGroupNameToIdMap.get(sendOption));
    } else if (lectureSectionNameToIdMap.has(sendOption)) {
      alert('to section ' + lectureSectionNameToIdMap.get(sendOption));
    } else {
      alert('need to select a send option');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-semi-lg" autoFocus={false}>
      <ModalHeader toggle={toggle}>
        What's on your mind?
      </ModalHeader>
      <ModalBody className='normal-height-modal-body'>
        <Form onSubmit={e => {e.preventDefault()}}>
          <FormGroup row>
            <Label for="sendOption" sm={2}><b>Send To</b></Label>
            <Col sm={3}>
              <Input
                type="select"
                name="sendOption"
                id="sendOption"
                value={sendOption}
                onChange={toggleSendOption}
              >
                <option>select one</option>
                <option value={TO_ALL}>everyone, everywhere</option>
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
        <Button color="primary" onClick={sendAnnouncement}>Send</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

SendAnnouncementModal.propTypes = propTypes;

export default SendAnnouncementModal;
