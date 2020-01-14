import React from 'react';
import { observer } from 'mobx-react-lite';
import { HomeProvider } from './store/index';
import Home from './Home';
export default observer(()=>{
  return (
    <HomeProvider>
      <Home/>
    </HomeProvider>
  )
})
