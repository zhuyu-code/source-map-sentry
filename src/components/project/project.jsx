import React,{ useEffect ,useState, useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {Icon ,Card,Tooltip,message,Spin, Empty} from 'antd';
import { Link } from 'react-router-dom';
import { useLocation} from "react-router";
import copy from 'copy-to-clipboard';
import './index.less'
import {useProjectStore} from './store/index';
import {getProjectList,deleteProject, addProject} from '../../api/index';
import AddProject from './AddProject';
import UpdateProject from './UpdateProject';
const {Meta} =Card;
const text=<span>复制项目Id</span>
export default observer((props)=>{
    const { setProjectLists,getProjectLists }=useProjectStore();
    const [isLoading, setisLoading] = useState(true)
    const location =useLocation()
    const arr=location.pathname.split('/');
    const productId=arr[2]
    const query=useCallback(
      () => {
        getProjectList(productId).then(res=>{
          console.log(res)
            setProjectLists(res.data.list);
            setisLoading(!isLoading)
        })
      },
      [],
    )
    useEffect(() => {
        query();
      },[]);

    function  deleteProjectFun(index){
     return async()=>{
      await deleteProject(index);
      query();
     }
    }
    function copyUrl(id){
      return ()=>{
        copy(id);
        message.info('复制成功，如果失败，请在输入框内手动复制.');
      }
    }
      return (
        <div className='project'>
       <AddProject productId={productId} query={query}/>
        <div className="project-content">
        {
          isLoading?
          <div className="project-loading"><Spin tip="loading..."></Spin></div>:
           ( getProjectLists().length==0 ? <div className="project-empty"><Empty /></div>: getProjectLists().map(res=>{
            return (
                <Card
                key={res.projectId}
                extra={<Link to={`/product/project/${res.projectId}/version`}>版本</Link>}
                type='inner'
                title={res.projectName}
                style={{ width: 200 }}
                actions={[
                  <Tooltip placement="bottom" title={text}>
                      <Icon type="copy" onClick={copyUrl(res.projectId)}/></Tooltip>
                ,
                <UpdateProject productId={productId} index={res.projectId} query={query}/>,
                <Icon className='delete' type="delete" key='delete' onClick={deleteProjectFun(res.projectId)}/>
                ]}
            >
                <Meta
                title={res.projectApp}
                description={res.projectDesc}
                />
            </Card>
            )
        }))
        }
        </div>
        </div>
    )
})
