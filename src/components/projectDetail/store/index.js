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
      },
      //errorList
      errorList:[],
      setErrorList(errorList){
        this.errorList=errorList;
      },
      getErrorList(){
        return this.errorList;
      },
      //data内容
      data:[
        { Hours: "0", Count: 0 },
        { Hours: "1", Count: 0 },
        { Hours: "2", Count: 0 },
        { Hours: "3", Count: 0 },
        { Hours: "4", Count: 0 },
        { Hours: "5", Count: 0 },
        { Hours: "6", Count: 0 },
        { Hours: "7", Count: 0 },
        { Hours: "8", Count: 0 },
        { Hours: "9", Count: 0 },
        { Hours: "10", Count: 0 },
        { Hours: "11", Count: 0 },
        { Hours: "12", Count: 0 },
        { Hours: "13", Count: 0 },
        { Hours: "14", Count: 0 },
        { Hours: "15", Count: 0 },
        { Hours: "16", Count: 0 },
        { Hours: "17", Count: 0 },
        { Hours: "18", Count: 0 },
        { Hours: "19", Count: 0 },
        { Hours: "20", Count: 0 },
        { Hours: "21", Count: 0 },
        { Hours: "22", Count: 0 },
        { Hours: "23", Count: 0 },
      ],
      setData(data){
        this.data=data;
      },
      getData(data){
        return this.data;
      }
    }
  })
  return (
    <ProjectDetailContext.Provider value={store}>
        {props.children}
    </ProjectDetailContext.Provider>
  )
})
