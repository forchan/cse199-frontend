import React, { Fragment, useState } from 'react';
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
import EditInstructorModal from '../../containers/modals/AddOrEditInstructorModalContainer.jsx';
import DeleteInstructorModal from '../../containers/modals/DeleteInstructorModalContainer.jsx';
import AddOrEditOfficeHoursModal from '../../containers/modals/AddOrEditOfficeHoursModalContainer.jsx';
import { replaceIfNull, isNullOrEmpty } from '../../utils/StringUtils.js';
import { DEFAULT_IMAGE_PATH } from '../../constants/InstructorConstants.js';

const propTypes = {
  instructor: PropTypes.object.isRequired,
  officeHour: PropTypes.object
};

const InstructorCard = ({ instructor, officeHour }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [officeHoursModal, setOfficeHoursModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleOfficeHoursModal = () => setOfficeHoursModal(!officeHoursModal);

  const image = (isNullOrEmpty(instructor.instructor_picture_url))
    ? DEFAULT_IMAGE_PATH
    : instructor.instructor_picture_url;

  return (
    <Fragment>
      {(editModal) &&
        <EditInstructorModal
          edit
          instructor={instructor}
          isOpen={editModal}
          toggle={toggleEditModal}
        />
      }
      {(deleteModal) &&
        <DeleteInstructorModal
          instructor={instructor}
          isOpen={deleteModal}
          toggle={toggleDeleteModal}
        />
      }
      {(officeHoursModal) &&
        <AddOrEditOfficeHoursModal
          isOpen={officeHoursModal}
          toggle={toggleOfficeHoursModal}
          instructorId={instructor.instructor_id}
        />
      }
      <Card className="instructor-card">
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
            <b>Email:</b> {replaceIfNull(instructor.instructor_contact, "N/A")}
          </CardSubtitle>
          <CardText style={{ height: '55px' }}>
            {(officeHour)
              ? <Fragment>
                  <b>Office Hours:</b> {replaceIfNull(officeHour.weekday, "No day")}{' '}
                  {replaceIfNull(officeHour.time_start, "no start")} to{' '}
                  {replaceIfNull(officeHour.time_end, "no end")}{' '}
                  <br/>
                  <b>Location:</b> {replaceIfNull(officeHour.location, "N/A")}
                </Fragment>
              : <Fragment>
                  <b>Office Hours:</b> N/A
                  <br/>
                  <b>Location:</b> N/A
                </Fragment>
            }
          </CardText>
          <Button
            className="float-right"
            onClick={toggleDeleteModal}
          >
            Delete
          </Button>
          <Button
            className="float-right"
            onClick={toggleEditModal}
          >
            Edit
          </Button>
          <Button
            className="float-right"
            onClick={toggleOfficeHoursModal}
          >
            Office
          </Button>
        </CardBody>
      </Card>
    </Fragment>
  );
};

InstructorCard.propTypes = propTypes;

export default InstructorCard;
