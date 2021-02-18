import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";

import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3001/");

class LiveVisitors extends Component {
  state = {
    visitors: [],
  };

  componentWillMount() {
    axios.get("http://www.geoplugin.net/json.gp").then((res) => {
      const {
        geoplugin_countryCode,
        geoplugin_city,
        geoplugin_countryName,
      } = res.data;

      const visitor = {
        countryCode: geoplugin_countryCode,
        country: geoplugin_countryName,
        city: geoplugin_city,
      };

      socket.emit("new_visitor", visitor);

      socket.on("visitors", (visitors) => {
        console.log(visitors);
        this.setState({
          visitors: visitors,
        });
      });
    });
  }

  getCountyFlag = (countryCode) =>
    `https://www.countryflags.io/${countryCode}/flat/64.png`;

  renderTableBody = () => {
    const { visitors } = this.state;
    return visitors.map((v, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{v.countryCode}</td>
          <td>{v.country}</td>
          <td>{v.city}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Live Visitors</h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Flag</th>
              <th>Country</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {this.state.visitors.map((v, index) => {
              if (v !== null) {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={this.getCountyFlag(v.countryCode)} />
                    </td>
                    <td>{v.country}</td>
                    <td>{v.city}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default LiveVisitors;
