import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle
} from 'reactstrap';
import RecitationStaffModal from '../../containers/modals/RecitationStaffModalContainer.jsx';
import DeleteSectionModal from '../Modals/DeleteSectionModal.jsx';

const defaultProps = {
  recitation: false
};

const propTypes = {
  section: PropTypes.object.isRequired,
  recitation: PropTypes.bool.isRequired
};

const SectionCard = ({ section, recitation }) => {
  const [recitationStaffModal, setStaffModal] = useState(false);
  const [deleteSectionModal, setDeleteModal] = useState(false);
  const toggleStaffModal = () => setStaffModal(!recitationStaffModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteSectionModal);

  return (
    <Fragment>
      {(recitationStaffModal) &&
        <RecitationStaffModal
          isOpen={recitationStaffModal}
          toggle={toggleStaffModal}
          section={section}
        />
      }
      {(deleteSectionModal) &&
        <DeleteSectionModal
          isOpen={deleteSectionModal}
          toggle={toggleDeleteModal}
          section={section}
        />
      }
      <Card className="section-card">
        <CardBody>
          <CardTitle>
            <b>{section.section_type} {section.section_name}</b>
          </CardTitle>
          <CardSubtitle>
            {section.section_schedule} {section.section_time}
          </CardSubtitle>
          <CardText>
            {section.section_location}
          </CardText>
          <Button className="float-right" onClick={toggleDeleteModal}>Delete</Button>
          <Button className="float-right" disabled>Edit</Button>
          {(recitation)
            && <Button className="float-right" onClick={toggleStaffModal}>Staff</Button>
          }
        </CardBody>
      </Card>
    </Fragment>
  );
};

SectionCard.defaultProps = defaultProps;
SectionCard.propTypes = propTypes;

export default SectionCard;
