import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LiveVisitors from "./Container/LiveVisitors";
import { Container, Col } from "reactstrap";

import "antd/dist/antd.css";

import Dashboard from "./Container/Dashboard/Dashboard";
import Store from "./Container/Dashboard/Store";

function App() {
  return (
    <div className="App">
      <Container>
        <Col>
          <Store>
            <Dashboard />
          </Store>
        </Col>
        <Col>
          <LiveVisitors />
        </Col>
      </Container>
    </div>
  );
}

export default App;
