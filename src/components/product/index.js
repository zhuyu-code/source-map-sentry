import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProductProvider } from './store/index';
import Product from './Product';
export default observer(()=>{
    return (
        <ProductProvider>
            <Product/>
        </ProductProvider>
    )
})
