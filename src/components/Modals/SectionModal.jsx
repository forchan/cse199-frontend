import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  CardDeck,
  Row,
  Col
} from 'reactstrap';
import SectionCard from '../Cards/SectionCard.jsx';
import { LECTURE, RECITATION } from '../../constants/ScheduleConstants.js';

class SectionModal extends Component {
  state = {
    activeTab: '1'
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
      <Fragment>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggleClose} size="lg" centered>
          <ModalHeader toggle={this.props.toggleClose}>
            Section {this.props.sectionGroup.section_group_name}
          </ModalHeader>
          <ModalBody style={{ backgroundColor: '#f4f3ef' }}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggleTab('1'); }}
                >
                  Lecture
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggleTab('2'); }}
                >
                  Recitation
                </NavLink>
              </NavItem>
            </Nav>
            &nbsp;
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <CardDeck>
                  {this.props.sections.map((section, key) => {
                    if (section.section_group_name === this.props.sectionGroup.section_group_name) {
                      if (section.section_type === LECTURE) {
                        return (
                          <SectionCard key={key} section={section} />
                        )
                      }
                    }
                  })}
                </CardDeck>
              </TabPane>
              <TabPane tabId="2">
                <CardDeck>
                  {this.props.sections.map((section, key) => {
                    if (section.section_group_name === this.props.sectionGroup.section_group_name) {
                      if (section.section_type === RECITATION) {
                        return (
                          <SectionCard key={key} section={section} />
                        )
                      }
                    }
                  })}
                </CardDeck>
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggleClose}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.props.toggleClose}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

SectionModal.propTypes = {
  isOpen:  PropTypes.bool,
  toggleClose: PropTypes.func,
  sectionGroup: PropTypes.object,
  sections: PropTypes.array
}

export default SectionModal;
