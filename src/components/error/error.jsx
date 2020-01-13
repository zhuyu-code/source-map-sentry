import React,{ useEffect } from 'react';
import {observer} from 'mobx-react-lite';
import {  Table, Divider, Tag} from 'antd';
import { Link } from 'react-router-dom';
import { useLocation} from "react-router";
import {useErrorStore} from './store/index';
import {getErrorList} from '../../api/index';
export default observer((props)=>{
    const { setErrorLists,getErrorLists }=useErrorStore();
    const location =useLocation()
    const arr=location.pathname.split('/');
    const versionId=arr[4];
    function query(){
      getErrorList(versionId).then(res=>{
        setErrorLists(res.data.list);
        })
    }
    useEffect(() => {
        query();
      },[]);


      const columns = [
        {
          title: '源码文件路径',
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
          title: '错误信息',
          key: 'message',
          dataIndex: 'message'
        },
        {
          title: '创建时间',
          dataIndex:'createTime',
          key: 'createTime'
        },
      ];

      const data = getErrorLists();
      return (
        <div className='product'>
          <Table columns={columns} dataSource={data}/>
        </div>
    )
})
