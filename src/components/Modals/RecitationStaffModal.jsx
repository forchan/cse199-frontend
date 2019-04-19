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
import InstructorCard from '../Cards/InstructorCard.jsx';
import {
  filterInstructorsBySectionAndSectionGroup
} from '../../utils/SectionInstructorUtils.js';

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
  const sectionGroupId = sectionGroupNameToIdMap.get(section.section_group_name);
  const sectionId = section.section_id;
  const staff = filterInstructorsBySectionAndSectionGroup(allSectionInstructors, sectionId, sectionGroupId);

  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={toggle} className="modal-semi-lg">
        <ModalHeader toggle={toggle}>
          Recitation Staff
        </ModalHeader>
        <ModalBody>
          <CardDeck>
            {staff.map(eachStaff => {
              return <InstructorCard instructor={eachStaff} key={eachStaff.instructor_id} />;
            })}
          </CardDeck>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Stuff</Button>{' '}
          <Button color="secondary" onClick={toggle}>Exit</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

RecitationStaffModal.propTypes = propTypes;

export default RecitationStaffModal;
