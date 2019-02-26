import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div className="content">
        <Jumbotron>
          <h1 className="display-3">Welcome!</h1>
          <hr className="my-2" />
          <p className="lead">
            This is the all new redesigned CSE 199 admin site.
          </p>
          <p>
            (hopefully this is the one that works..)
          </p>
          <p className="text-warning">
            - currently under constuction -
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
