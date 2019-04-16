import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardBody
} from 'reactstrap';
import EditAnnouncementModal from '../Modals/EditAnnouncementModal.jsx';

const propTypes = {
  announcement: PropTypes.object.isRequired
};

const AnnouncementCard = ({ announcement }) => {
  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);

  return (
    <Fragment>
      {(editModal) &&
        <EditAnnouncementModal
          isOpen={editModal}
          toggle={toggleEditModal}
        />
      }
      <Card>
        <CardBody>
          <CardTitle>
            <b>Title:</b> {announcement.title}
          </CardTitle>
          <CardText>
            <b>Description:</b> {announcement.text}
          </CardText>
          <Button className="float-right" onClick={toggleEditModal}>Edit</Button>
        </CardBody>
      </Card>
    </Fragment>
  );
};

AnnouncementCard.propTypes = propTypes;

export default AnnouncementCard;
