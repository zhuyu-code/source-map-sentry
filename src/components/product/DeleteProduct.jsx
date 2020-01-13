import React, { Fragment } from 'react';
import {Icon,Modal,Tooltip} from 'antd';
import {deleteProduct} from '../../api/index'
const text=<span>删除产品</span>
export default ((props)=>{
  const {index,query}=props;
  function onMadal(index){
   return ()=>{
    Modal.confirm({
      content:"你确定是否删除吗",
      okText:"删除",
      cancelText:"取消",
      onOk:deleteProductFun(index),
    })
   }
  }
  function deleteProductFun(index){
    return async ()=>{
       await deleteProduct(index);
      query();
    }
}
  return (
      <Fragment>
          <Tooltip placement="bottom" title={text}>
          <Icon className='delete' type="delete" key='delete' onClick={onMadal(index)} className="delete"/>
         </Tooltip>

    </Fragment>

  )
})
