import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardColumns
} from 'reactstrap';
import classnames from 'classnames';
import InstructorCard from './Cards/InstructorCard.jsx';
import AddInstructorModal from './Modals/AddOrEditInstructorModal.jsx';

const propTypes = {
  courseId: PropTypes.string.isRequired,
  instructors: PropTypes.array.isRequired,
  officeHours: PropTypes.array.isRequired,
  reloadInstructors: PropTypes.func.isRequired
};

const Team = ({ instructors, officeHours, courseId, reloadInstructors }) => {
  const [addInstructorModal, setModal] = useState(false);
  const [activeTab, setTab] = useState('1');
  const toggleModal = () => setModal(!addInstructorModal);
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setTab(tab);
    }
  };

  const officeHourMap = new Map();
  const instructorCards = [];
  const taCards = [];

  officeHours.forEach((officeHour) => {
    officeHourMap.set(officeHour.instructor_id, officeHour);
  });

  instructors.forEach((instructor) => {
    if (instructor.instructor_type !== 'INSTRUCTOR') {
      taCards.push(
        <InstructorCard
          key={instructor.instructor_id}
          instructor={instructor}
          officeHour={officeHourMap.get(instructor.instructor_id)}
        />
      );
    } else {
      instructorCards.push(
        <InstructorCard
          key={instructor.instructor_id}
          instructor={instructor}
          officeHour={officeHourMap.get(instructor.instructor_id)}
        />
      );
    }
  });

  return (
    <div className="content">
      <AddInstructorModal
        isOpen={addInstructorModal}
        toggle={toggleModal}
        courseId={courseId}
        reloadInstructors={reloadInstructors}
      />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggleTab('1')}
          >
            Instructors
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => toggleTab('2')}
          >
            Teaching Assistants
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => toggleModal()}
          >
            Add New{' '}
            <span data-notify="icon" className="nc-icon nc-user-run" />
          </NavLink>
        </NavItem>
      </Nav>
      &nbsp;
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <CardColumns>
            {instructorCards}
          </CardColumns>
        </TabPane>
        <TabPane tabId="2">
          <CardColumns>
            {taCards}
          </CardColumns>
        </TabPane>
        <TabPane tabId="3">
          This message is hidden lol.
        </TabPane>
      </TabContent>
    </div>
  );
};

Team.propTypes = propTypes;

export default Team;
