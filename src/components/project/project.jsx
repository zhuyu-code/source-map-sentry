import React,{ useEffect } from 'react';
import {observer} from 'mobx-react-lite';
import {Icon ,Card} from 'antd';
import { Link } from 'react-router-dom';
import { useLocation} from "react-router";
import {useProjectStore} from './store/index';
import {getProjectList,deleteProject} from '../../api/index';
import AddHeader from './AddHeader';
import UpdateHeader from './updateHeader';
const {Meta} =Card;
export default observer((props)=>{
    const { setProjectLists,getProjectLists }=useProjectStore();
    const location =useLocation()
    const arr=location.pathname.split('/');
    const productId=arr[2]
    function query(){
        getProjectList(productId).then(res=>{
          console.log(res)
            setProjectLists(res.data.list);
        })
    }
    useEffect(() => {
        query();
      },[]);

    function  deleteProjectFun(index){
     return async()=>{
      await deleteProject(index);
      query();
     }
    }
      return (
        <div className='product'>
       <AddHeader productId={productId} query={query}/>
        <div className="productContent">
        {
            getProjectLists().map(res=>{
                return (
                    <Card
                    key={res.projectId}
                    extra={<Link to={`/product/project/${res.projectId}/version`}>版本</Link>}
                    type='inner'
                    title={res.projectName}
                    style={{ width: 200 }}
                    actions={[
                    <UpdateHeader productId={productId} index={res.projectId} query={query}/>,
                    <Icon className='delete' type="delete" key='delete' onClick={deleteProjectFun(res.projectId)}/>
                    ]}
                >
                    <Meta
                    title={res.projectApp}
                    description={res.projectDesc}
                    />
                </Card>
                )
            })
        }
        </div>
        </div>
    )
})
