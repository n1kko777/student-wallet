import React from "react";
import { Tabs } from "antd";

import UserSettings from "../user/UserSettings";
import WalletSettings from "../wallets/WalletSettings";
import CategorySettings from "../categories/CategorySettings";
import PeriodSettings from "../PeriodSettings";

export const Settings = () => {
  const { TabPane } = Tabs;

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Профиль" key="1">
        <UserSettings />
      </TabPane>
      <TabPane tab="Отчетный период" key="2">
        <PeriodSettings />
      </TabPane>
      <TabPane tab="Счета" key="3">
        <WalletSettings />
      </TabPane>
      <TabPane tab="Категории" key="4">
        <CategorySettings />
      </TabPane>
    </Tabs>
  );
};
