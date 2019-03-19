import React from 'react';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardBody,
  CardLink
} from 'reactstrap';

const MaterialCard = (props) => {
  return (
    <Card>
      <CardBody>
        <CardText>
          <b>{props.material.description}</b>
        </CardText>
        <CardLink href={props.material.url} target="_blank">
          {props.material.url}
        </CardLink>
        {''}
        <Button className="float-right">Beepboop</Button>
      </CardBody>
    </Card>
  );
}

export default MaterialCard;
