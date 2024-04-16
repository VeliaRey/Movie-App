import React, { Component } from "react";
import { Spin } from "antd";
import "../Spinner/Spinner.css";

class Spinner extends Component {
  render() {
    return <Spin size="large"></Spin>;
  }
}

export default Spinner;
