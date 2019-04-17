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
import EditAnnouncementModal from '../../containers/modals/AddOrEditAnnouncementModalContainer.jsx';
import DeleteAnnouncementModal from '../../containers/modals/DeleteAnnouncementModalContainer.jsx';

const defaultProps = {
  sentTo: ''
};

const propTypes = {
  announcement: PropTypes.object.isRequired,
  sentTo: PropTypes.string.isRequired
};

const AnnouncementCard = ({ announcement, sentTo }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  return (
    <Fragment>
      {(editModal) &&
        <EditAnnouncementModal
          isOpen={editModal}
          toggle={toggleEditModal}
          announcement={announcement}
          sentTo={sentTo}
        />
      }
      {(deleteModal) &&
        <DeleteAnnouncementModal
          isOpen={deleteModal}
          toggle={toggleDeleteModal}
          announcement={announcement}
          sentTo={sentTo}
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
            <b>Message:</b> {announcement.text}
          </CardText>
          <Button className="float-right" onClick={toggleDeleteModal}>Delete</Button>
          <Button className="float-right" onClick={toggleEditModal}>Edit</Button>
        </CardBody>
      </Card>
    </Fragment>
  );
};

AnnouncementCard.defaultProps = defaultProps;
AnnouncementCard.propTypes = propTypes;

export default AnnouncementCard;
