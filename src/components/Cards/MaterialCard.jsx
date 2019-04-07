import React from 'react';
import PropTypes from 'prop-types';
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
          <b>Title: </b>{props.material.title}
        </CardText>
        <CardText>
          <b>Description: </b>{props.material.description}
        </CardText>
        <CardText>
          <b>Text: </b>{props.material.text}
        </CardText>
        <CardText>
          <b>Format: </b>{props.material.materials_format}
        </CardText>
        <CardText>
          <b>Due date: </b>{props.material.due_date}
        </CardText>
        <b>URL: </b>
        <CardLink href={props.material.url} target="_blank">
          {props.material.url}
        </CardLink>
        {''}
        <Button className="float-right">beepboop</Button>
      </CardBody>
    </Card>
  );
}

MaterialCard.propTypes = {
  material: PropTypes.object
}

export default MaterialCard;
