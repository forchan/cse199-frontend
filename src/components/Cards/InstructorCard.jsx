import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody
} from 'reactstrap';
import { optional } from '../../utils/StringUtils.js';
import { BASE_URL } from '../../constants/ApiConstants.js';

const InstructorCard = (props) => {
  const image = (props.instructor.instructor_picture_url === null || props.instructor.instructor_picture_url === '') ?
    BASE_URL + '/images/default.jpg' :
    BASE_URL + '/' + props.instructor.instructor_picture_url;

  return (
    <Card style={{ maxWidth: '300px' }}>
      <CardImg
        top
        height="300px"
        src={image}
        alt="Instructor image"
      />
      <CardBody>
        <CardTitle>
          {optional(props.instructor.instructor_title)} {props.instructor.instructor_firstname} {props.instructor.instructor_lastname}
        </CardTitle>
        <CardSubtitle>
          {optional(props.instructor.instructor_contact, "No contact info")}
        </CardSubtitle>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
}

InstructorCard.propTypes = {
  instructor: PropTypes.object
}

export default InstructorCard;
