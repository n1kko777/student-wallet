import React from "react";
import { Tabs } from "antd";

import UserSettings from "../user/UserSettings";
import WalletSettings from "../wallets/WalletSettings";
import CategorySettings from "../categories/CategorySettings";

export const Settings = () => {
  const { TabPane } = Tabs;

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Профиль" key="1">
        <UserSettings />
      </TabPane>
      <TabPane tab="Счета" key="2">
        <WalletSettings />
      </TabPane>
      <TabPane tab="Категории" key="3">
        <CategorySettings />
      </TabPane>
    </Tabs>
  );
};
