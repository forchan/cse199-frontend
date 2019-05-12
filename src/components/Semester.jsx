import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Label,
  Col,
  Input
} from 'reactstrap';
import { upperCaseFirstLetterOnly } from '../utils/StringUtils.js';

const propTypes = {
  semesters: PropTypes.array.isRequired
};

const Semester = ({ semesters }) => {
  const [createNewModal, setModal] = useState(false);
  const [activeTab, setTab] = useState('1');
  const toggleModal = () => setModal(!createNewModal);
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setTab(tab);
    }
  };

  return (
    <div className="content">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggleTab('1')}
          >
            Switch
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => toggleModal()}>
            Create New{' '}
            <span data-notify="icon" className="nc-icon nc-spaceship" />
          </NavLink>
        </NavItem>
      </Nav>
      &nbsp;
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Card style={{ width: '550px' }}>
            <CardBody>
              <CardTitle>
                <b>Currently Selected</b>
              </CardTitle>
              &nbsp;
              <FormGroup row>
                <Label for="selectSemester" sm={3}>Select Semester</Label>
                <Col sm={9}>
                  <Input
                    type="select"
                    name="selectSemester"
                    id="selectSemester"
                  >
                    <option></option>
                    {semesters.map(semester => {
                      return (
                        <option key={semester.course_id}>
                          {semester.course_department}{' '}
                          {semester.course_number} -{' '}
                          {semester.course_name} -{' '}
                          {upperCaseFirstLetterOnly(semester.course_semester)}{' '}
                          {semester.course_year}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <Button className="float-right">Switch</Button>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          This wont't show lol.
        </TabPane>
      </TabContent>
    </div>
  );
};

Semester.propTypes = propTypes;

export default Semester;
