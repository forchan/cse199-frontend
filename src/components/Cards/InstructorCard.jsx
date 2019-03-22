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
import { optional } from '../../utils/StringUtils.js';
import { BASE_URL } from '../../constants/ApiConstants.js';

const InstructorCard = (props) => {
  const image = (props.instructor.instructor_picture_url === null || props.instructor.instructor_picture_url === '') ?
    BASE_URL + '/images/default.jpg' :
    BASE_URL + '/' + props.instructor.instructor_picture_url;

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
            {optional(props.instructor.instructor_title)}{' '}
            {props.instructor.instructor_firstname} {props.instructor.instructor_lastname}
          </b>
        </CardTitle>
        <CardSubtitle>
          Email: {optional(props.instructor.instructor_contact, "N/A")}
        </CardSubtitle>
        <CardText>
          {(props.officeHour) ?
            <Fragment>
              Office Hours: {optional(props.officeHour.weekday, "No day")}{' '}
              {optional(props.officeHour.time_start, "no start")} to{' '}
              {optional(props.officeHour.time_end, "no end")}{' '}
              <br/>
              Location: {optional(props.officeHour.location, "N/A")}
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
