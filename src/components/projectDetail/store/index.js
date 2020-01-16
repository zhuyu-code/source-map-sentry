import React, {createContext,useContext} from 'react';
import {observer, useLocalStore} from 'mobx-react-lite';
const ProjectDetailContext=createContext(null);
export function useProjectDetailStore(){
  return useContext(ProjectDetailContext)
}
export const ProjectDetailProvider=observer((props)=>{
  const store=useLocalStore(()=>{
    return {
      //当前项目详细信息
      project:{},
      setProject(project){
        this.project=project;
      },
      getProject(){
        return this.project;
      }
      ,
      //拉取的项目列表
      projectLists:[],
      setProjectLists(projectLists){
        this.projectLists=projectLists;
      },
      getProjectLists(){
        return this.projectLists;
      },
      //默认选中的项目
      targetProject:"",
      setTargetProject(targetProject){
        this.targetProject=targetProject;
      },
      getTargetProject(){
        return this.targetProject;
      }
    }
  })
  return (
    <ProjectDetailContext.Provider value={store}>
        {props.children}
    </ProjectDetailContext.Provider>
  )
})
