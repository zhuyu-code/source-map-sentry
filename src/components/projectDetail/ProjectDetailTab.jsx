import React, {useMemo} from "react";
import { observer } from "mobx-react-lite";
import { Tabs, Icon} from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const { TabPane } = Tabs;
const KEYS = ['/', '/sentry', '/statistics', '/wiki'];

export default observer(props => {
  const location=useLocation();
  const productId = location.pathname.split("/")[2];
  const projectId = location.pathname.split("/")[4];
  const tab1=<Link to={`/product/${productId}/project/${projectId}/projectDetail`}><Icon type="file-text" />项目信息</Link>
  const tab2=<Link to={`/product/${productId}/project/${projectId}/projectDetail/sentry`}><Icon type="radar-chart" />错误监控</Link>
  const tab3=<Link to={`/product/${productId}/project/${projectId}/projectDetail/statistics`}><Icon type="bar-chart" />错误统计</Link>
  const tab4=<Link to={`/product/${productId}/project/${projectId}/projectDetail/wiki`}><Icon type="form" />wiki</Link>
  const defaultActiveKey = useMemo(() => {
    const paths = location.pathname.split("/");
    const match = `/${paths.pop()}`;
    if (paths && paths.length > 0) {
      const curKey = KEYS.find(key => key === match);
      console.log(curKey);
      return curKey || KEYS[0];
    }
    return KEYS[0];
  }, [location])
  return (
    <div className="project-detail-tabs">
      <Tabs defaultActiveKey={defaultActiveKey}>
        <TabPane tab={tab1} key={KEYS[0]}/>

        <TabPane tab={tab2} key={KEYS[1]}/>

        <TabPane tab={tab3}  key={KEYS[2]}/>

        <TabPane tab={tab4}  key={KEYS[3]}/>
      </Tabs>
    </div>
  );
});
