import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  CardDeck
} from 'reactstrap';
import SectionCard from '../Cards/SectionCard.jsx';
import AddSectionModal from '../../containers/modals/AddOrEditSectionModalContainer.jsx';
import { LECTURE, RECITATION } from '../../constants/ScheduleConstants.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleClose: PropTypes.func.isRequired,
  sectionGroup: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired
};

const SectionModal = ({ isOpen, toggleClose, sectionGroup, sections }) =>{
  const [addSectionModal, setSectionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const toggleAddSectionModal = () => setSectionModal(!addSectionModal);
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Fragment>
      <AddSectionModal
        isOpen={addSectionModal}
        toggle={toggleAddSectionModal}
        sectionGroup={sectionGroup}
      />
      <Modal isOpen={isOpen} toggle={toggleClose} size="lg">
        <ModalHeader toggle={toggleClose}>
          Section {sectionGroup.section_group_name}
        </ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => toggleTab('1')}
              >
                Lecture
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => toggleTab('2')}
              >
                Recitation
              </NavLink>
            </NavItem>
          </Nav>
          &nbsp;
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <CardDeck>
                {sections
                  .filter((section) => (
                    (section.section_group_name === sectionGroup.section_group_name)
                    && (section.section_type === LECTURE)
                  ))
                  .map((section, index) => {
                    return (
                      <SectionCard key={index} section={section} />
                    )
                  })
                }
              </CardDeck>
            </TabPane>
            <TabPane tabId="2">
              <CardDeck>
                {sections
                  .filter((section) => (
                    (section.section_group_name === sectionGroup.section_group_name)
                    && (section.section_type === RECITATION)
                  ))
                  .map((section, index) => {
                    return (
                      <SectionCard recitation key={index} section={section} />
                    )
                  })
                }
              </CardDeck>
            </TabPane>
          </TabContent>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleAddSectionModal}>Add Section</Button>{' '}
          <Button color="secondary" onClick={toggleClose}>Exit</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

SectionModal.propTypes = propTypes;

export default SectionModal;
