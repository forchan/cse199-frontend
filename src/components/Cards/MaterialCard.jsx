import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardText,
  CardBody,
  CardLink
} from 'reactstrap';

const propTypes = {
  material: PropTypes.object.isRequired
};

const MaterialCard = ({ material }) => {
  return (
    <Card>
      <CardBody>
        <CardText>
          <b>Title: </b>{material.title}
        </CardText>
        <CardText>
          <b>Description: </b>{material.description}
        </CardText>
        <CardText>
          <b>Text: </b>{material.text}
        </CardText>
        <CardText>
          <b>Format: </b>{material.materials_format}
        </CardText>
        <CardText>
          <b>Due date: </b>{material.due_date}
        </CardText>
        <b>URL: </b>
        <CardLink href={material.url} target="_blank">
          {material.url}
        </CardLink>
        {''}
        <Button className="float-right">beepboop</Button>
      </CardBody>
    </Card>
  );
};

MaterialCard.propTypes = propTypes;

export default MaterialCard;
