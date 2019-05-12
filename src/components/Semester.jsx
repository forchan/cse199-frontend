import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const propTypes = {

};

const Semester = ({ }) => {
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
