import React, { createContext,useContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';

const  ErrorContext = createContext(null);
export function useErrorStore(){
    return useContext(ErrorContext);
}
export const ErrorProvider=observer((props)=>{
    const store=useLocalStore(()=>{
        return {
            errorList:[],
            setErrorLists(errorList){
                this.errorList=errorList;
            },
            getErrorLists(){
                return this.errorList;
            }
        }
    })
    return (
        <ErrorContext.Provider value={store}>
            {props.children}
        </ErrorContext.Provider>
    )
})
