import React, P from 'react';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody
} from 'reactstrap';

const Instructor = (props) => {
  return (
    <Card>
      <CardImg
        top
        width="100%"
        src={props.image}
        alt="Instructor image"
      />
      <CardBody>
        <CardTitle>{props.instructor}</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>
          This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
        </CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
}

export default Instructor;
