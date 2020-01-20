import React,{useEffect,useState, Fragment} from "react";
import { observer } from "mobx-react-lite";
import { Layout, Select, Icon } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import {useLocation} from 'react-router'
import {getVersionList,getVersionIdError} from '../../../../api/index'
import {useProjectDetailStore} from '../../store/index'
const { Option } = Select;
export default observer(props => {

  const [version, setversion] = useState([])//version列表
  const [versionId, setVersionId] = useState(0)
  const {setErrorList,getErrorList}= useProjectDetailStore();
  const location=useLocation();
  const projectId = location.pathname.split("/")[4];
  useEffect(() => {
    getVersionList(projectId).then(res=>{
      const data=res.data.list.sort((a,b)=>a.versionId-b.versionId);
      setversion(data);
    })
  }, [])

  function changeVersion(versionId){
    getVersionIdError(versionId).then(res=>{
      console.log(res)
      setErrorList(res.data.list);
    })
  }

  function changeCreateTime(date,datestring){
      console.log(datestring)
  }
  return (
     <Fragment>
          <div className="project-datail-sentry-select">
          <div className="head">
            <Icon type="fork" />
            <span className="content">版本</span>
          </div>
          <Select placeholder="请选择版本" onChange={changeVersion}>
           {
             version.map((item)=>{
              return <Option key={item.versionId} value={item.versionId}>{item.versionName}</Option>
             })
           }
          </Select>
        </div>
        <div className="project-datail-sentry-select">
          <div className="head">
            <Icon type="cluster" />
            <span className="content">错误类型</span>
          </div>
          <Select placeholder="请选择错误类型" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <div className="project-datail-sentry-select">
          <div className="head">
            <Icon type="bell" />
            <span className="content">状态</span>
          </div>
          <Select placeholder="选择状态" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>

           {/* 开始时间 */}
        <div className="project-datail-sentry-select">
          <div className="head">
            <Icon type="bell" />
            <span className="content">开始时间</span>
          </div>
          <DatePicker
            onChange={changeCreateTime}
            format="YYYY-MM-DD HH:mm:ss"
            // disabledDate={disabledDate}
            // disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
          />
        </div>
          {/* 结束时间 */}
        <div className="project-datail-sentry-select">
          <div className="head">
            <Icon type="bell" />
            <span className="content">结束时间</span>
          </div>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            // disabledDate={disabledDate}
            // disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
          />
        </div>
     </Fragment>
  )
});
