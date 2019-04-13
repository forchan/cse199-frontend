import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardBody
} from 'reactstrap';

const AnnouncementCard = ({ announcement }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <b>Title:</b> {announcement.title}
        </CardTitle>
        <CardText>
          <b>Description:</b> {announcement.text}
        </CardText>
        <Button className="float-right">beepboop</Button>
      </CardBody>
    </Card>
  );
}

AnnouncementCard.propTypes = {
  announcement: PropTypes.object.isRequired
}

export default AnnouncementCard;
