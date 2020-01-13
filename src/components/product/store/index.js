import React, { createContext,useContext } from 'react'
import { useLocalStore, observer } from 'mobx-react-lite'
const  MyContext = createContext(null);
export function useProductStore(){
    return useContext(MyContext);
}
export const ProductProvider=observer((props)=>{
    const store=useLocalStore(()=>{
        return {
          //产品列表
            productList:[],
            setProductLists(productList){
                this.productList=productList;
            },
            getProductLists(){
                return this.productList;
            },
            //产品总长度
            total:0,
            setTotal(total){
              this.total=total;
            },
            getTotal(){
              return this.total;
            },
            //页码所在位置和大小
            page:1,
            pageSize:10,
            setPage(page){
              this.page=page
            },
            getPage(){
              return this.page
            },
            setPageSize(pageSize){
              this.pageSize=pageSize;
            },
            getPageSize(){
              return this.pageSize;
            }
        }
    })
    return (
        <MyContext.Provider value={store}>
            {props.children}
        </MyContext.Provider>
    )
})
