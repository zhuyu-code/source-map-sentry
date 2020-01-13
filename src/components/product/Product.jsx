import React ,{useEffect,useState, useCallback} from 'react';
import './index.less'
import { Card, Pagination} from 'antd';
import { observer } from 'mobx-react-lite';
import {useProductStore} from './store/index';
import {getProductList} from '../../api/index'
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import SearchProduct from './SearchProduct'
import { Link } from 'react-router-dom';
const { Meta } = Card;
export default observer(()=>{
    const {setProductLists,getProductLists,setTotal,getTotal,setPage,setPageSize,getPage,getPageSize}=useProductStore();
    const query = useCallback(
        (page = 1,pageSize = 10) => {
              const userInfo=JSON.parse(localStorage.getItem('userInfo'));
              getProductList({userId:userInfo.userId,page:page,pageSize:pageSize}).then(res=>{
                console.log(res.data);
                setTotal(res.data.total)
                setProductLists(res.data.list);
            })
        },
        [],
    )
    useEffect(() => {
      query();
    },[]);


    function onShowSizeChange(current, pageSize){
      setPage(current);
      setPageSize(pageSize)
      query(current,pageSize);
    }
    return (
      <div className='product'>
       <AddProduct query={query}/>
       <SearchProduct page={getPage()} pageSize={getPageSize()}/>
       <div className="topBottom">
       <div className="productContent">
        {
            getProductLists().map(res=>{
                return (
                    <Card
                    key={res.productId}
                    extra={<Link to={`/product/${res.productId}/project`}>查看项目</Link>}
                    type='inner'
                    title={res.productName}
                    style={{ width: 250 }}
                    actions={[
                    <UpdateProduct index={res.productId} query={query}/>,
                    <DeleteProduct index={res.productId} query={query}/>
                    ]}
                >
                    <Meta
                    title={res.productCategory}
                    description={res.productDesc}
                    />
                </Card>
                )
            })
        }
        </div>
        <Pagination
          showSizeChanger
          onChange={onShowSizeChange}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={getPage()}
          defaultPageSize={getPageSize()}
          total={getTotal()}
          style={{textAlign:"center"}}
        />
       </div>
        </div>
    )
})
