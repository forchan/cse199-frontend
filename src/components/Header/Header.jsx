import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from "reactstrap";
import {
  COURSE_ID,
  COURSE_YEAR,
  COURSE_SEMESTER
} from '../../constants/CookieConstants.js';
import {
  displayNotification,
  SUCCESS,
  WARNING
} from '../../utils/NotificationUtils.js';
import { getSemesterObjectFromArrayByCourseId } from '../../utils/ArrayUtils.js';

const propTypes = {
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  courseYear: PropTypes.string.isRequired,
  courseSemester: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  semesters: PropTypes.array.isRequired
};

class Header extends Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    color: "white"
  }

  switchSemester = (selectedSemesterCourseId) => {
    const { cookies, courseId, loadAllContent, setCourseDetails, semesters } = this.props;

    if (selectedSemesterCourseId === courseId) {
      displayNotification('You are already viewing the selected semester', WARNING);
      return;
    }
    const selectedSemesterObject = getSemesterObjectFromArrayByCourseId(
      selectedSemesterCourseId,
      semesters
    );
    const { course_year, course_semester } = selectedSemesterObject;
    loadAllContent(selectedSemesterCourseId);
    setCourseDetails(selectedSemesterCourseId, course_year, course_semester);
    cookies.set(COURSE_ID, selectedSemesterCourseId, { path: '/' });
    cookies.set(COURSE_YEAR, course_year, { path: '/' });
    cookies.set(COURSE_SEMESTER, course_semester, { path: '/' });
    displayNotification('Semester switched!', SUCCESS);
  }

  toggle = () => {
    if (this.state.isOpen) {
      this.setState({ color: "white" });
    } else {
      this.setState({ color: "dark" });
    }
    this.setState({ isOpen: !this.state.isOpen });
  }

  dropdownToggle = (e) => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  getBrand = () => {
    var name;
    this.props.routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }

  openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.refs.sidebarToggle.classList.toggle("toggled");
  }

  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark"
      });
    } else {
      this.setState({
        color: "white"
      });
    }
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updateColor.bind(this));
  }

  componentDidUpdate = (e) => {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.refs.sidebarToggle.classList.toggle("toggled");
    }
  }

  render() {
    const { courseSemester, courseYear, semesters, location } = this.props;

    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref="sidebarToggle"
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand>{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <NavbarBrand>
              {courseSemester} {courseYear}
            </NavbarBrand>
            <Nav navbar>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-umbrella-13" />
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  {semesters.slice(0).reverse().map(semester => {
                    return (
                      <DropdownItem
                        onClick={() => this.switchSemester(semester.course_id)}
                        key={semester.course_id}
                      >
                        {semester.course_department}{' '}
                        {semester.course_number} -{' '}
                        {semester.course_semester}{' '}
                        {semester.course_year}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <NavLink
                  href="https://cse.buffalo.edu/faculty/ahunt/classes/internet/"
                  target="_blank"
                  className="nav-link btn-magnify"
                >
                  <i className="nc-icon nc-globe" />
                  <p>
                    <span className="d-lg-none d-md-block">Student Site</span>
                  </p>
                </NavLink>
              </NavItem>
              <NavItem>
                <Link to="#@________@" className="nav-link btn-rotate">
                  <i className="nc-icon nc-settings-gear-65" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = propTypes;

export default withCookies(Header);
