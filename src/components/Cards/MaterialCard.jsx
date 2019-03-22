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
          <b>{props.material.description}</b>
        </CardText>
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
