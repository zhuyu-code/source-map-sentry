import React, { createContext,useContext } from 'react'
import { useLocalStore, observer } from 'mobx-react-lite'
const  ProjectContext = createContext(null);
export function useProjectStore(){
    return useContext(ProjectContext);
}
export const ProjectProvider=observer((props)=>{
    const store=useLocalStore(()=>{
        return {
            //项目列表
            projectList:[],
            setProjectLists(projectList){
                this.projectList=projectList;
            },
            getProjectLists(){
                return this.projectList;
            },
            //选择颜色属性
            color:["#56b8eb","#f28033","#ebc656","#a2d148","#a2d148","#e85b72","#7461c2"],
            setColor(color){
              this.color=color;
            },
            getColor(){
              return this.color;
            },
            //页码位置和分页大小
            page:1,
            setPage(page){
              this.page=page
            },
            getPage(){
              return this.page
            },
            pageSize:10,
            setPageSize(pageSize){
              this.pageSize=pageSize
            },
            getPageSize(){
              return this.pageSize;
            },
          //总共条数
          total:0,
          setTotal(total){
            this.total=total;
          },
          getTotal(){
            return this.total;
          }
        }
    })
    return (
        <ProjectContext.Provider value={store}>
            {props.children}
        </ProjectContext.Provider>
    )
})
