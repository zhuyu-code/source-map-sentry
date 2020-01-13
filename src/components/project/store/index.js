import React, { createContext,useContext } from 'react'
import { useLocalStore, observer } from 'mobx-react-lite'
const  ProjectContext = createContext(null);
export function useProjectStore(){
    return useContext(ProjectContext);
}
export const ProjectProvider=observer((props)=>{
    const store=useLocalStore(()=>{
        return {
            projectList:[],
            setProjectLists(projectList){
                this.projectList=projectList;
            },
            getProjectLists(){
                return this.projectList;
            }
        }
    })
    return (
        <ProjectContext.Provider value={store}>
            {props.children}
        </ProjectContext.Provider>
    )
})