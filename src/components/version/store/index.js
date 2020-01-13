import React, { createContext,useContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';

const  VersionContext = createContext(null);
export function useVersionStore(){
    return useContext(VersionContext);
}
export const VersionProvider=observer((props)=>{
    const store=useLocalStore(()=>{
        return {
            versionList:[],
            setVersionLists(versionList){
                this.versionList=versionList;
            },
            getVersionLists(){
                return this.versionList;
            }
        }
    })
    return (
        <VersionContext.Provider value={store}>
            {props.children}
        </VersionContext.Provider>
    )
})
