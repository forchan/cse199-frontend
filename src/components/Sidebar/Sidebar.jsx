import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import logo from "../../styles/img/logo.svg";

class Sidebar extends Component {
  state = {
    backgroundColor: "black",
    activeColor: "info",
  }

  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  render() {
    return (
      <div
        className="sidebar"
        data-color={this.state.backgroundColor}
        data-active-color={this.state.activeColor}
      >
        <div className="logo">
          <a
            href="http://www-student.cse.buffalo.edu/CSE199/admin"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="http://www-student.cse.buffalo.edu/CSE199/admin"
            className="simple-text logo-normal"
          >
            CSE 199 Admin
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={this.activeRoute(prop.path)}
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
