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

const defaultProps = {
  recitation: false
};

const propTypes = {
  section: PropTypes.object.isRequired,
  recitation: PropTypes.bool.isRequired
};

const SectionCard = ({ section, recitation }) => {
  const [recitationStaffModal, setModal] = useState(false);
  const toggleModal = () => setModal(!recitationStaffModal);

  return (
    <Fragment>
      {(recitation) &&
        <RecitationStaffModal
          isOpen={recitationStaffModal}
          toggle={toggleModal}
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
          <Button className="float-right" disabled>Edit</Button>
          {(recitation)
            && <Button className="float-right" onClick={toggleModal}>Staff</Button>
          }
        </CardBody>
      </Card>
    </Fragment>
  );
};

SectionCard.defaultProps = defaultProps;
SectionCard.propTypes = propTypes;

export default SectionCard;
