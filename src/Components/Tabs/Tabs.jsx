import React, { Component } from "react";
import { Tabs } from "antd";
import "./Tabs.css";

class MenuTabs extends Component {
  render() {
    const { onTabsSwitch } = this.props;
    const items = [
      {
        label: "Search",
        key: "search",
      },
      {
        label: "Reated",
        key: "rated",
      },
    ];

    const onHandleSwitch = (event) => {
      if (event === "rated") {
        onTabsSwitch(true);
      } else {
        onTabsSwitch(false);
      }
    };
    return (
      <Tabs
        items={items}
        mode="horizontal"
        defaultActiveKey="search"
        destroyInactiveTabPane="true"
        onChange={onHandleSwitch}
      />
    );
  }
}

export default MenuTabs;
