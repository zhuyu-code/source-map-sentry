import React,{ useEffect } from 'react';
import {observer} from 'mobx-react-lite';
import { Card} from 'antd';
import { Link } from 'react-router-dom';
import { useLocation} from "react-router";
import {useVersionStore} from './store/index';
import {getVersionList} from '../../api/index';
const {Meta} =Card;
export default observer((props)=>{
    const { setVersionLists,getVersionLists }=useVersionStore();
    const location =useLocation()
    const arr=location.pathname.split('/');
    const projectId=arr[3];
    function query(){
        getVersionList(projectId).then(res=>{
          setVersionLists(res.data.list);
        })
    }
    useEffect(() => {
        query();
      },[]);

      return (
        <div className='product'>
        <div className="productContent">
        {
            getVersionLists().map(res=>{
                return (
                    <Card
                    key={res.versionId}
                    extra={<Link to={`/product/project/version/${res.versionId}/errorList`}>错误列表</Link>}
                    type='inner'
                    title={res.versionName}
                    style={{ width: 200 }}
                >
                    <Meta
                    description={res.versionDesc}
                    />
                </Card>
                )
            })
        }
        </div>
        </div>
    )
})
