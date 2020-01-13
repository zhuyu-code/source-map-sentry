import React, { useState } from 'react';
import {  Form, Input, Button, Modal, Select, message ,Icon} from 'antd';
import { addProduct } from '../../api/index';
import {observer} from 'mobx-react-lite';
const { TextArea }=Input;
const { Option } = Select;
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
            const params={};
            const userInfo=JSON.parse(localStorage.getItem('userInfo'));
            params.createPerson=userInfo.userName
            params.userId=userInfo.userId;
            console.log()
            await addProduct(params,values).then(res=>{
                message.success(res.message);
            })
            props.query();
          }
        });
        setVisible(false)
      };
    return (
        <div className="productHeader">
        <Button type="primary" onClick={showModal}>
        <Icon type="file-add" />
         新建产品
        </Button>
        <Modal
          title="增加产品信息"
          visible={visible}
          okText="添加"
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
      </div>
    )
})
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;
