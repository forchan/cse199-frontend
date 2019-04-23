import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardText,
  CardBody,
  CardLink
} from 'reactstrap';
import EditMaterialModal from '../Modals/AddOrEditMaterialModal.jsx';

const propTypes = {
  material: PropTypes.object.isRequired
};

const MaterialCard = ({ material }) => {
  const [editMaterialModal, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editMaterialModal);

  return (
    <Fragment>
      {(editMaterialModal) &&
        <EditMaterialModal
          isOpen={editMaterialModal}
          toggle={toggleEditModal}
          material={material}
        />
      }
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
          <Button className="float-right" onClick={toggleEditModal}>Edit</Button>
        </CardBody>
      </Card>
    </Fragment>
  );
};

MaterialCard.propTypes = propTypes;

export default MaterialCard;
