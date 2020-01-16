import React from "react";
import { observer } from "mobx-react-lite";
import { ProjectDetailProvider } from "./store/index";
import ProjectDetail from "./projectDetail";
export default (() => {
  return (
    <ProjectDetailProvider>
      <ProjectDetail />
    </ProjectDetailProvider>
  );
});
