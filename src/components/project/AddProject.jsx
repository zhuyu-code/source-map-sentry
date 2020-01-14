import React, { useState } from 'react';
import {  Form, Input, Button, Modal, Select } from 'antd';
import { addProject } from '../../api/index';
import {observer} from 'mobx-react-lite';
const { TextArea }=Input;
const { Option } = Select;
 const NormalLoginForm= ((props)=>{
    const { getFieldDecorator } = props.form;
    const [visible, setVisible] = useState(false)
    const [option,setOption]=useState(['平台1','平台2','平台3','平台4'])
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
            console.log(values);
            const params={};
            const userInfo=JSON.parse(localStorage.getItem('userInfo'));
            params.userId=userInfo.userId;
            params.createPerson=userInfo.createPerson;
            await addProject(values,props.productId,params).then(res=>{
                console.log(res);
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
        <div className="project-header">
        <Button type="primary" onClick={showModal}>
         新建项目
        </Button>
        <Modal
          title="增加项目信息"
          visible={visible}
          okText="添加"
          onOk={handleSubmit}
          onCancel={handleCancel}
        >

      <Form  className="login-form">
        <Form.Item>
          {getFieldDecorator('projectName', {
            rules: [{ required: true, message: '项目名不能为空' }],
          })(
            <Input
              placeholder="输入项目名"
            />,
          )}
        </Form.Item>
        {/* <Form.Item>
          {getFieldDecorator('projectApp', {
            rules: [{ required: true, message: '项目平台不能为空' }],
          })(
            <Input
              placeholder="输入创建人"
            />,
          )}
        </Form.Item> */}
        <Form.Item>
          {getFieldDecorator('projectApp', {
            rules: [{ required: true, message: '项目平台不能为空' }],
          })(
            <Select
              placeholder="请选择项目平台"
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
          {getFieldDecorator('projectDesc', {
            rules: [{ required: true, message: '项目描述不能为空' }],
          })(
            <TextArea placeholder="请输入项目描述" rows={4} />
          )}
        </Form.Item>
      </Form>
        </Modal>
      </div>
    )
})
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;
