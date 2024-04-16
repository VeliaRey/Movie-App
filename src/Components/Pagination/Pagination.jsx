import React, { Component } from "react";
import { Pagination } from "antd";

import "./Pagination.css";

class Pagi extends Component {
  render() {
    const { allPages, onSelectedPage, selectedPage } = this.props;
    return (
      <div className="pagination">
        <Pagination
          total={allPages * 10}
          onChange={onSelectedPage}
          current={selectedPage}
        />
      </div>
    );
  }
}

export default Pagi;
