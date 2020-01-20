import React, { Fragment,useState } from "react";
import { observer } from "mobx-react-lite";
import './index.less'
import ProjectDetailSelect from './ProjectDetailSelect';
import ProjectDetailTab from './ProjectDetailTab'
import { Switch,Route } from "react-router-dom";
import UpdateProject from './projectDetailComponent/UpdateProject';
import SentryProject from './projectDetailComponent/SentryProject';
import StatisticsProject from './projectDetailComponent/StatisticsProject';
import WikiProject from './projectDetailComponent/WikiProject'

export default observer((props) => {
  return (
    <Fragment>
      <div className="project-detail">
        <ProjectDetailSelect/>
        <ProjectDetailTab/>
      </div>
      <div className="project-detail-content">

        <Switch>
        <Route path="/product/:productId/project/:projectId/projectDetail/sentry" component={SentryProject}/>
        <Route path="/product/:productId/project/:projectId/projectDetail/statistics" component={StatisticsProject}/>
        <Route path="/product/:productId/project/:projectId/projectDetail/wiki" component={WikiProject}/>
        <Route path="/product/:productId/project/:projectId/projectDetail" component={UpdateProject}/>
        </Switch>
      </div>
    </Fragment>
  );
});
