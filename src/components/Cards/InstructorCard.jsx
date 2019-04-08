import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText
} from 'reactstrap';
import { replaceIfNull, isNullOrEmpty } from '../../utils/StringUtils.js';
import { DEFAULT_IMAGE_PATH } from '../../constants/ImageConstants.js';

const propTypes = {
  instructor: PropTypes.object.isRequired,
  officeHour: PropTypes.object
};

const InstructorCard = ({ instructor, officeHour }) => {
  const image = (isNullOrEmpty(instructor.instructor_picture_url))
    ? DEFAULT_IMAGE_PATH
    : instructor.instructor_picture_url;

  return (
    <Card style={{ width: '300px', height: '500px' }}>
      <CardImg
        top
        height="300px"
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
          Email: {replaceIfNull(instructor.instructor_contact, "N/A")}
        </CardSubtitle>
        <CardText>
          {(officeHour) ?
            <Fragment>
              Office Hours: {replaceIfNull(officeHour.weekday, "No day")}{' '}
              {replaceIfNull(officeHour.time_start, "no start")} to{' '}
              {replaceIfNull(officeHour.time_end, "no end")}{' '}
              <br/>
              Location: {replaceIfNull(officeHour.location, "N/A")}
            </Fragment>
            :
            <Fragment>
              Office Hours: N/A
              <br/>
              Location: N/A
            </Fragment>
          }
        </CardText>
        <Button className="float-right">Edit</Button>
      </CardBody>
    </Card>
  );
}

InstructorCard.propTypes = propTypes;

export default InstructorCard;
