import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip
} from 'reactstrap';
import AnnouncementCard from './Cards/AnnouncementCard.jsx';
import SendAnnouncementModal from '../containers/modals/AddOrEditAnnouncementModalContainer.jsx';
import { isNullOrEmpty } from '../utils/StringUtils.js';
import { SEND_TO_ALL } from '../constants/MaterialConstants.js';

const propTypes = {
  announcements: PropTypes.array.isRequired,
  lectureSectionIdToNameMap: PropTypes.object.isRequired,
  sectionGroupIdToNameMap: PropTypes.object.isRequired
};

const Announcements = ({ announcements, lectureSectionIdToNameMap, sectionGroupIdToNameMap }) => {
  const [sendAnnouncementModal, setModal] = useState(false);
  const [activeTab, setTab] = useState('1');
  const toggleModal = () => setModal(!sendAnnouncementModal);
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setTab(tab);
    }
  };

  return (
    <div className="content">
      <SendAnnouncementModal
        isOpen={sendAnnouncementModal}
        toggle={toggleModal}
      />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggleTab('1')}
          >
            <span id="PreviousTooltip" href="#">Previous</span>
            <UncontrolledTooltip placement="top" target="PreviousTooltip">
              Filtered by most recent
            </UncontrolledTooltip>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => toggleModal()}>
            Send New{' '}
            <span data-notify="icon" className="nc-icon nc-send" />
          </NavLink>
        </NavItem>
      </Nav>
      &nbsp;
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {announcements.map((announcement, index) => {
            let sentTo = '';
            if (!isNullOrEmpty(announcement.section_id)) {
              sentTo = lectureSectionIdToNameMap.get(announcement.section_id);
            } else if (!isNullOrEmpty(announcement.section_group_id)) {
              sentTo = sectionGroupIdToNameMap.get(announcement.section_group_id);
            } else {
              sentTo = SEND_TO_ALL
            }
            return (
              <AnnouncementCard
                announcement={announcement}
                key={index}
                sentTo={sentTo}
              />
            )
          })}
        </TabPane>
        <TabPane tabId="2">
          This wont't show lol.
        </TabPane>
      </TabContent>
    </div>
  );
};

Announcements.propTypes = propTypes;

export default Announcements;
