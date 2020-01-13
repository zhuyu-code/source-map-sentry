import React, { useState, Fragment } from 'react';
import {  Form, Input, Modal, Select, Icon, Tooltip, message } from 'antd';
import { updateProduct } from '../../api/index';
    const { TextArea }=Input;
    const { Option } = Select;
    const text=<span>编辑产品</span>
    const NormalLoginForm= ((props)=>{
    const { getFieldDecorator } = props.form;
    const [visible, setVisible] = useState(false)
    const [option,setOption]=useState(['WEB','React Native','安卓','小程序'])
    function showModal(){
        setVisible(true)
    }
    function handleCancel(){
        setVisible(false)
    }
    function handleSubmit(e){
        e.preventDefault();
       props.form.validateFields(async(err, values) => {
          if (!err) {
            await updateProduct(values,props.index).then(res=>{
                if(res.code==800){
                  message.success(res.message)
                }else if(res.code===801){
                  message.warning(res.message)
                }else{
                  message.error("更新失败")
                }
            })
            props.query();
          }
        });
        setVisible(false)
      };
    function handleSelectChange(value){
        console.log(value);
    }

    return (
        <Fragment >
           <Tooltip placement="bottom" title={text}>
           <Icon type="edit" key="edit" onClick={showModal}/>
         </Tooltip>

        <Modal
          title="修改产品信息"
          visible={visible}
          okText="修改"
          cancelText="取消"
          onOk={handleSubmit}
          onCancel={handleCancel}
        >

      <Form  className="login-form">
        <Form.Item>
          {getFieldDecorator('productName', {
            rules: [{ required: true, message: '产品名不能为空' }],
          })(
            <Input
              placeholder="输入产品名"
            />,
          )}
        </Form.Item>
        {/* <Form.Item>
          {getFieldDecorator('createPerson', {
            rules: [{ required: true, message: '创建人不能为空' }],
          })(
            <Input
              placeholder="输入创建人"
            />,
          )}
        </Form.Item> */}
        <Form.Item>
          {getFieldDecorator('productCategory', {
            rules: [{ required: true, message: '产品分类不能为空' }],
          })(
            <Select
              placeholder="请选择产品分类"
              onChange={handleSelectChange}
            >
            {
                option.map((res,index)=>{
                return (<Option key={index} value={res}>{res}</Option>)
                })
            }

            </Select>,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('productDesc', {
            rules: [{ required: true, message: '产品描述不能为空' }],
          })(
            <TextArea placeholder="请输入产品描述" rows={4} />
          )}
        </Form.Item>
      </Form>
        </Modal>
      </Fragment>
    )
})
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;
