import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle
} from 'reactstrap';

const SectionCard = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <b>{props.section.section_type} {props.section.section_name}</b>
        </CardTitle>
        <CardSubtitle>
          {props.section.section_schedule} {props.section.section_time}
        </CardSubtitle>
        <CardText>
          {props.section.section_location}
        </CardText>
        <Button className="float-right">Beepboop</Button>
      </CardBody>
    </Card>
  );
}

SectionCard.propTypes = {
  section: PropTypes.object
}

export default SectionCard;
