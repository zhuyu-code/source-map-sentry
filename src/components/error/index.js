import React from 'react';
import { observer } from 'mobx-react-lite';
import { ErrorProvider } from './store/index';
import Error from './error';
export default observer(()=>{
    return (
        <ErrorProvider>
            <Error/>
        </ErrorProvider>
    )
})
