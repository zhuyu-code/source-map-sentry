import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { Select,Icon } from "antd";
import { getProjectList } from "../../api/index";
import { useProjectDetailStore } from "./store/index";
import history from "../../utils/history";

const { Option } = Select;
export default observer((props) => {
  const location = useLocation();
  const {
    setProjectLists,
    getProjectLists,
    setTargetProject,
    getTargetProject
  } = useProjectDetailStore();
  const productId = location.pathname.split("/")[2];
  const projectId = location.pathname.split("/")[4];
  useEffect(() => {
    getProjectList(productId).then(res => {
      setProjectLists(res.data.list);
      const item = getProjectName(res.data.list,projectId);
      setTargetProject(item);
    });
  }, []);

  //遍历对比和的到当前选中的项目名
  function getProjectName(arr,projectId) {
    const targetObj = arr.find(item => {
     return item.projectId == projectId
    });
    return targetObj.projectName;
  }
  function selectChange(e){
    history.push(`/product/${productId}/project/${e}/projectDetail`)
  }
  return (
      <div className="project-detail-select">
        <Select
          style={{ width: 240 }}
          suffixIcon={<Icon type="down" />}
          value={getTargetProject()}
          onChange={selectChange}
        >
          {
          getProjectLists().map(item => (
            <Option key={item.projectId}>{item.projectName}</Option>
          ))}
        </Select>
      </div>
  );
});
