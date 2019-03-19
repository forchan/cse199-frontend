import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardBody
} from 'reactstrap';

const AnnouncementCard = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <b>{props.announcement.title}</b>
        </CardTitle>
        <CardText>
          {props.announcement.text}
        </CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
}

AnnouncementCard.propTypes = {
  announcement: PropTypes.object
}

export default AnnouncementCard;
