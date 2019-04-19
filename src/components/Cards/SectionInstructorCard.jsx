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
import { replaceIfNull, isNullOrEmpty } from '../../utils/StringUtils.js';
import { DEFAULT_IMAGE_PATH } from '../../constants/InstructorConstants.js';

const propTypes = {
  instructor: PropTypes.object.isRequired,
  officeHour: PropTypes.object
};

const SectionInstructorCard = ({ instructor }) => {
  const image = (isNullOrEmpty(instructor.instructor_picture_url))
    ? DEFAULT_IMAGE_PATH
    : instructor.instructor_picture_url;

  return (
    <Card className="section-instructor-card">
      <CardImg
        top
        height="225px"
        src={image}
        alt="Instructor image"
      />
      <CardBody>
        <CardTitle>
          <b>
            {replaceIfNull(instructor.instructor_title)}{' '}
            {instructor.instructor_firstname} {instructor.instructor_lastname}
          </b>
        </CardTitle>
        <CardSubtitle>
          <b>Email:</b> {replaceIfNull(instructor.instructor_contact, "N/A")}
        </CardSubtitle>
        <Button
          className="float-right"
          onClick={() => alert('o')}
          disabled
        >
          Delete
        </Button>
      </CardBody>
    </Card>
  );
};

SectionInstructorCard.propTypes = propTypes;

export default SectionInstructorCard;
