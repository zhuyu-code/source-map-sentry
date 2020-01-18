import React,{useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Table } from "antd";
import {useLocation} from 'react-router';
import {getProjectIdError} from '../../../../api/index';
import {useProjectDetailStore} from '../../store/index'
const columns = [
  {
    title: '源码文件名',
    dataIndex: 'newfilename',
    key: 'newfilename',
    render: text => <a>{text}</a>,
  },
  {
    title: '源码行',
    dataIndex: 'lineno',
    key: 'lineno',
  },
  {
    title: '源码列',
    dataIndex: 'colno',
    key: 'colno',
  },
  {
    title: '报错信息',
    key: 'message',
    dataIndex: 'message',
  },
  {
    title: '报错时间',
    dataIndex:'createTime',
    key: 'createTime',
  },
  {
    title: '所属版本',
    dataIndex:'versionName',
    key: 'versionName',
  }
];

export default observer(props => {
  const {setErrorList,getErrorList}=useProjectDetailStore();
  const location=useLocation();
  const projectId = location.pathname.split("/")[4];
  useEffect(() => {
    getProjectIdError(projectId).then(res=>{
      setErrorList(res.data)
    })
  }, [])
  return (
  <Table rowKey={record=>record.errorId} columns={columns} dataSource={getErrorList()} />
  );
});
