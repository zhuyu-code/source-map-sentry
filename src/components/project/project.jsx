import React, { useEffect, useState, useCallback, Fragment } from "react";
import {Link} from 'react-router-dom'
import { observer } from "mobx-react-lite";
import {
  Icon,
  Card,
  Tooltip,
  message,
  Spin,
  Empty,
  Divider,
  Pagination
} from "antd";
import { useLocation } from "react-router";
import copy from "copy-to-clipboard";
import DeleteProject from "./DeleteProject";
import "./index.less";
import { useProjectStore } from "./store/index";
import { getProjectList } from "../../api/index";
import AddProject from "./AddProject";
import UpdateProject from "./UpdateProject";
const { Meta } = Card;
const text1 = <span>复制项目Id</span>;
const text2 = <span>项目设置</span>;
export default observer(props => {
  const {
    setProjectLists,
    getProjectLists,
    getColor,
    setPage,
    getPage,
    setPageSize,
    getPageSize,
    setTotal,
    getTotal
  } = useProjectStore();
  const [isLoading, setisLoading] = useState(true);
  const location = useLocation();
  const arr = location.pathname.split("/");
  const productId = arr[2];
  const query = useCallback((page = getPage(), pageSize = getPageSize()) => {
    getProjectList(productId, { page: page, pageSize: pageSize }).then(res => {
      console.log(res);
      setProjectLists(res.data.list);
      setTotal(res.data.total);
      setisLoading(!isLoading);
    });
  }, []);
  useEffect(() => {
    query();
  }, []);
  function copyUrl(id) {
    return () => {
      copy(id);
      message.info("复制成功，如果失败，请在输入框内手动复制.");
    };
  }
  function onShowSizeChange(current, pageSize) {
    setPage(current);
    setPageSize(pageSize);
    query(current, pageSize);
  }
  return (
    <Fragment>
      <div className="project-title">
        <Divider orientation="left">
          <Icon type="unordered-list" />
          <span style={{ marginLeft: "10px" }}>我创建的项目</span>
        </Divider>
      </div>
      <div className="project">
        <div className="project-content">
          {isLoading ? (
            <div className="project-loading">
              <Spin tip="loading..."></Spin>
            </div>
          ) : getProjectLists().length == 0 ? (
            <div className="project-empty">
              <Empty />
            </div>
          ) : (
            <div className="project-add-item">
              {getProjectLists().map(res => {
                return (
                  <Card
                    key={res.projectId}
                    extra={
                     <Tooltip placement="top" title={text2}>
                        <Link to={`/product/${res.productId}/project/${res.projectId}/projectDetail`}>
                        <Icon type="setting" style={{ color: "#ffffff" }} />
                        </Link>
                     </Tooltip>
                    }
                    style={{ width: 300 }}
                    type="inner"
                    style={{ width: 240 }}
                    headStyle={{
                      backgroundColor: `${getColor()[res.projectColor]}`
                    }}
                    bodyStyle={{
                      backgroundColor: `${getColor()[res.projectColor]}`
                    }}
                    actions={[
                      <Tooltip placement="bottom" title={text1}>
                        <div onClick={copyUrl(res.projectId)}>
                          <Icon type="copy" />
                          <span>粘贴</span>
                        </div>
                      </Tooltip>,
                      <DeleteProject index={res.projectId} query={query} />
                    ]}
                  >
                    <p>{res.projectName}</p>
                  </Card>
                );
              })}
              <AddProject productId={productId} query={query} />
            </div>
          )}
        </div>
      </div>
      <Pagination
        showSizeChanger
        onChange={onShowSizeChange}
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={getPage()}
        defaultPageSize={getPageSize()}
        total={getTotal()}
        style={{ textAlign: "center" }}
      />
    </Fragment>
  );
});
