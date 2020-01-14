import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProjectProvider } from './store/index';
import Project from './Project';
export default observer(()=>{
    return (
        <ProjectProvider>
            <Project/>
        </ProjectProvider>
    )
})
