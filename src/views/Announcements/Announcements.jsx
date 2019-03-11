import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card
} from 'reactstrap';
import classnames from 'classnames';
import AnnouncementCard from '../../components/Announcements/AnnouncementCard.jsx';

class Announcements extends Component {
  state = {
    activeTab: '1',
  }
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  createAnnouncementCards = () => {
    let announcementCards = [];
    this.props.state.announcements.forEach((announcement) => {
      announcementCards.push(
        <AnnouncementCard announcement={announcement} key={announcement.materials_id} />
      )
    })
    return announcementCards;
  }
  render() {
    const announcementCards = this.createAnnouncementCards();
    return (
      <div className="content">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Previous
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Send New
            </NavLink>
          </NavItem>
        </Nav>
        &nbsp;
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {announcementCards}
          </TabPane>
          <TabPane tabId="2">

          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Announcements;
