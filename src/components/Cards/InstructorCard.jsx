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
import {
  replaceIfNull,
  isNullOrEmpty
} from '../../utils/StringUtils.js';
import { DEFAULT_IMAGE_PATH } from '../../constants/ImageConstants.js';

const InstructorCard = (props) => {
  const image = (isNullOrEmpty(props.instructor.instructor_picture_url))
    ? DEFAULT_IMAGE_PATH
    : props.instructor.instructor_picture_url;

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
            {replaceIfNull(props.instructor.instructor_title)}{' '}
            {props.instructor.instructor_firstname} {props.instructor.instructor_lastname}
          </b>
        </CardTitle>
        <CardSubtitle>
          Email: {replaceIfNull(props.instructor.instructor_contact, "N/A")}
        </CardSubtitle>
        <CardText>
          {(props.officeHour) ?
            <Fragment>
              Office Hours: {replaceIfNull(props.officeHour.weekday, "No day")}{' '}
              {replaceIfNull(props.officeHour.time_start, "no start")} to{' '}
              {replaceIfNull(props.officeHour.time_end, "no end")}{' '}
              <br/>
              Location: {replaceIfNull(props.officeHour.location, "N/A")}
            </Fragment>
            :
            <Fragment>
              Office Hours: N/A
              <br/>
              Location: N/A
            </Fragment>
          }
        </CardText>
        <Button className="float-right">beepboop</Button>
      </CardBody>
    </Card>
  );
}

InstructorCard.propTypes = {
  instructor: PropTypes.object,
  officeHour: PropTypes.object
}

export default InstructorCard;
