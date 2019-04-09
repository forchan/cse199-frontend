import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip
} from 'reactstrap';
import classnames from 'classnames';
import AnnouncementCard from './Cards/AnnouncementCard.jsx';
import SendAnnouncementModal from './Modals/SendAnnouncementModal.jsx';

class Announcements extends Component {
  state = {
    sendAnnouncementModal: false,
    activeTab: '1'
  }
  toggleModal = () => {
    this.setState(prevState => ({
      sendAnnouncementModal: !prevState.sendAnnouncementModal
    }));
  }
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div className="content">
        <SendAnnouncementModal
          isOpen={this.state.sendAnnouncementModal}
          toggle={this.toggleModal}
        />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggleTab('1'); }}
            >
              <span id="PreviousTooltip" href="#">Previous</span>
              <UncontrolledTooltip placement="top" target="PreviousTooltip">
                Filtered by most recent
              </UncontrolledTooltip>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => { this.toggleModal(); }}>
              Send New{' '}
              <span data-notify="icon" className="nc-icon nc-send" />
            </NavLink>
          </NavItem>
        </Nav>
        &nbsp;
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.props.announcements.map((announcement, index) => {
              return (
                <AnnouncementCard announcement={announcement} key={index} />
              )
            })}
          </TabPane>
          <TabPane tabId="2">
            This wont't show lol.
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Announcements;
