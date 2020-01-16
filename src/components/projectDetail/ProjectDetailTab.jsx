import React from "react";
import { observer } from "mobx-react-lite";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const { TabPane } = Tabs;
export default observer(props => {
  const location=useLocation();
  const productId = location.pathname.split("/")[2];
  const projectId = location.pathname.split("/")[4];
  const tab1=<Link to={`/product/${productId}/project/${projectId}/projectDetail`}>项目信息</Link>
  const tab2=<Link to={`/product/${productId}/project/${projectId}/projectDetail/sentry`}>错误监控</Link>
  const tab3=<Link to={`/product/${productId}/project/${projectId}/projectDetail/statistics`}>错误统计</Link>
  const tab4=<Link to={`/product/${productId}/project/${projectId}/projectDetail/wiki`}>wiki</Link>
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab={tab1} key="1">
        </TabPane>

        <TabPane tab={tab2} key="2">
          Content of Tab Pane 2
        </TabPane>

        <TabPane tab={tab3} key="3">
          Content of Tab Pane 3
        </TabPane>

        <TabPane tab={tab4} key="4">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
});
