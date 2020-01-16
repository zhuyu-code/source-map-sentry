import React, { Fragment } from "react";
import { Icon, Modal, Tooltip } from "antd";
import { deleteProject } from "../../api/index";
const text2 = <span>删除产品</span>;
export default props => {
  const { index, query } = props;
  function onMadal(index) {
    return () => {
      Modal.confirm({
        content: "你确定是否删除吗",
        okText: "删除",
        cancelText: "取消",
        onOk: deleteProjectFun(index)
      });
    };
  }
  function deleteProjectFun(index) {
    return async () => {
      await deleteProject(index);
      query();
    };
  }
  return (
    <Fragment>
      <Tooltip placement="bottom" title={text2}>
        <div className="project-delete" onClick={onMadal(index)}>
          <span>删除</span>
          <Icon className="delete" type="delete" key="delete" />
        </div>
      </Tooltip>
    </Fragment>
  );
};
