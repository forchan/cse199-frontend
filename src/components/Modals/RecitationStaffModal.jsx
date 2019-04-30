import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CardDeck
} from 'reactstrap';
import SectionInstructorCard from '../Cards/SectionInstructorCard.jsx';
import AddStaffToSectionModal from '../../containers/modals/AddStaffToSectionModalContainer.jsx';
import { getRecitationStaff } from '../../utils/SectionInstructorUtils.js';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  sectionGroupNameToIdMap: PropTypes.object.isRequired,
  allSectionInstructors: PropTypes.array.isRequired
};

const RecitationStaffModal = ({
  isOpen,
  toggle,
  section,
  allSectionInstructors,
  sectionGroupNameToIdMap
}) => {
  const [addStaffToSectionModal, setAddStaffToSectionModal] = useState(false);
  const toggleAddStaffToSectionModal = () => setAddStaffToSectionModal(!addStaffToSectionModal);
  const sectionGroupId = sectionGroupNameToIdMap.get(section.section_group_name);
  const staff = getRecitationStaff(allSectionInstructors, section.section_id, sectionGroupId);

  return (
    <Fragment>
      <AddStaffToSectionModal
        isOpen={addStaffToSectionModal}
        toggle={toggleAddStaffToSectionModal}
        openedSection={section}
      />
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          Recitation Staff {section.section_name}
        </ModalHeader>
        <ModalBody>
          <CardDeck>
            {staff.map(eachStaff => {
              return <SectionInstructorCard instructor={eachStaff} section={section} key={eachStaff.instructor_id} />;
            })}
          </CardDeck>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggleAddStaffToSectionModal}>Assign Staff</Button>{' '}
          <Button color="secondary" onClick={toggle}>Exit</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

RecitationStaffModal.propTypes = propTypes;

export default RecitationStaffModal;
