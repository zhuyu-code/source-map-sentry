import React, { createContext, useContext } from 'react';
import {useLocalStore,observer} from 'mobx-react-lite';

const MyContext=createContext(null);

export function useProductStore(){
  return useContext(MyContext);
}
export const HomeProvider=observer((props)=>{
  const store=useLocalStore(()=>{
    return {
      home:"nice"
    }
  })
  return (
    <MyContext.Provider value={store}>
      {props.children}
    </MyContext.Provider>
  )
})
