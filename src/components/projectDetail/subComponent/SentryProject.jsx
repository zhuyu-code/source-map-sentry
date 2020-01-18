import React,{useEffect} from "react";
import { observer } from "mobx-react-lite";
import SentryTable from "./sentryComponent/SentryTable";
import SentrySelect from './sentryComponent/SentrySelect'
export default observer(props => {

  return (
    <div className="project-detail-main">
       <div className="project-detail-sider">
     <SentrySelect/>
     </div>
      <div className="project-detail-content">
        <SentryTable />
      </div>
    </div>
  );
});
