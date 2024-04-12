import React, { Component } from "react";
import { Pagination } from "antd";

import "./Pagination.css";

class Pagi extends Component {
  render() {
    const { allPages, onSelectedPage } = this.props;
    return (
      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          total={allPages * 10}
          onChange={onSelectedPage}
        />
      </div>
    );
  }
}

export default Pagi;
