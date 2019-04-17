import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody
} from 'reactstrap';
import EditAnnouncementModal from '../Modals/EditAnnouncementModal.jsx';

const propTypes = {
  announcement: PropTypes.object.isRequired,
  sentTo: PropTypes.string.isRequired
};

const AnnouncementCard = ({ announcement, sentTo }) => {
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
            <b>Sent to:</b> {sentTo}
          </CardTitle>
          <CardSubtitle>
            <b>Title:</b> {announcement.title}
          </CardSubtitle>
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
