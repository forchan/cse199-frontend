import React from 'react';
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

export default AnnouncementCard;
