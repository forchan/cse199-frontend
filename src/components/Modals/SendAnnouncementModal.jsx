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
import {
  TO_ALL,
  TO_SECTION_GROUP,
  TO_SECTION
} from '../../constants/AnnouncementConstants.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired,
  sectionGroups: PropTypes.array.isRequired
};

const SendAnnouncementModal = ({ isOpen, toggle, sections, sectionGroups }) => {
  const [sendOption, setSendOption] = useState('');
  const toggleSendOption = event => setSendOption(event.target.value);
  const sendAnnouncement = () => {
    if (sendOption === TO_ALL) {
      alert('to everyone');
    } else if (sendOption.includes(TO_SECTION_GROUP)) {
      alert('to section group ' + sendOption.substring(TO_SECTION_GROUP.length));
    } else if (sendOption.includes(TO_SECTION)) {
      alert('to section ' + sendOption.substring(TO_SECTION.length));
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
        <Form>
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
                  const sectionGroupValue = TO_SECTION_GROUP + sectionGroup.sg_id;
                  return (
                    <option value={sectionGroupValue} key={sectionGroup.section_group_name}>
                      {sectionGroup.section_group_name}
                    </option>
                  );
                })}
                {sections
                  .filter(allSections => {
                    return allSections.section_type === LECTURE
                  })
                  .map(lecSection => {
                    const lecSectionValue = TO_SECTION + lecSection.section_id;
                    return (
                      <option value={lecSectionValue} key={lecSection.section_name}>
                        {lecSection.section_name}
                      </option>
                    );
                  })}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="title" sm={2}><b>Title</b></Label>
            <Col sm={10}>
              <Input type="text" name="title" id="title" autoFocus />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="message" sm={2}><b>Message</b></Label>
            <Col sm={10}>
              <Input type="textarea" name="message" id="message" />
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
