import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import classnames from 'classnames';
import AnnouncementCard from '../../components/Cards/AnnouncementCard.jsx';

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
  render() {
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
            {this.props.state.announcements.map((announcement, key) => {
              return (
                <AnnouncementCard announcement={announcement} key={key} />
              )
            })}
          </TabPane>
          <TabPane tabId="2">

          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Announcements;
