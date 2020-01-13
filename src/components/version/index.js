import React from 'react';
import { observer } from 'mobx-react-lite';
import { VersionProvider } from './store/index';
import Version from './version';
export default observer(()=>{
    return (
        <VersionProvider>
            <Version/>
        </VersionProvider>
    )
})
