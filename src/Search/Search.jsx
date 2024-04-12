import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  // state = {
  // 	searchLabel: ""
  // }

  // onChange2 = (event) => {
  // 		this.setState = {
  // 			searchLabel: event.target.value
  // 		}
  // 	}
  render() {
    const { searchLabel, onLabelChange } = this.props;
    return (
      <form action="" method="get">
        <input
          className="search"
          name="search"
          type="search"
          placeholder="Type to search..."
          onChange={onLabelChange}
          defaultValue={searchLabel}
        />
      </form>
    );
  }
}
export default Search;
