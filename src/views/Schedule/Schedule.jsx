import React, { Component } from 'react';
import { Table, Card, Button, Nav  } from 'reactstrap';
import { Link } from "react-router-dom";

class Schedule extends Component {
  render() {
    return (
      <div className="content">
      <Card>
        <Table bordered>
          <thead>
            <tr>
              <th>Section</th>
              <th>Intro Weeks</th>
              <th>Weeks 3 - 4</th>
              <th>Weeks 5 - 6</th>
              <th>Weeks 7 - 8</th>
              <th>Weeks 9 - 10</th>
              <th>Weeks 11 - 12</th>
              <th>Weeks 13 - 14</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">A</th>
              <td>
                <Link
                  to={"/home"}
                  style={{ textDecoration: 'none' }}
                >
                  Module
                </Link>
              </td>
              <td onClick={() => alert("lmao")}>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <th scope="row">B</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <th scope="row">C</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <th scope="row">D</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <th scope="row">E</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <th scope="row">F</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </Table>
        </Card>
      </div>
    );
  }
}

export default Schedule;
