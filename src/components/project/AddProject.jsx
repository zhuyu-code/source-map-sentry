import React, { useState } from "react";
import { Form, Input, Icon, Modal, Select, message, Radio } from "antd";
import { addProject } from "../../api/index";
import { observer } from "mobx-react-lite";
const { TextArea } = Input;
const { Option } = Select;
const NormalLoginForm = observer(props => {
  const { getFieldDecorator } = props.form;
  const [visible, setVisible] = useState(false);
  const [option] = useState(["平台1", "平台2", "平台3", "平台4"]);
  function showModal() {
    setVisible(true);
  }
  function handleCancel() {
    setVisible(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const params = {};
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        params.userId = userInfo.userId;
        params.createPerson = userInfo.userName;
        await addProject(values, props.productId, params).then(res => {
          if (res.code === 700) {
            message.success(res.message);
          } else if (res.code == 701) {
            message.warning(res.message);
          } else {
            message.error(res.message);
          }
        });
        props.query();
        setVisible(false);
      }
    });
  }
  function handleSelectChange(value) {
    console.log(value);
  }
  return (
    <div className="project-header">
      <div className="project-addproject-item" onClick={showModal}>
        <Icon type="plus-circle" />
        <div>创建项目</div>
      </div>
      <Modal
        title="增加项目信息"
        visible={visible}
        okText="添加"
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator("projectName", {
              rules: [{ required: true, message: "项目名不能为空" }]
            })(<Input placeholder="输入项目名" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("projectColor", {
              rules: [{ required: true, message: "项目背景颜色必选" }]
            })(
              <Radio.Group>
                <Radio buttonStyle="solid" className="radio1" value={0} />
                <Radio className="radio2" value={1} />
                <Radio className="radio3" value={2} />
                <Radio className="radio4" value={3} />
                <Radio className="radio5" value={4} />
                <Radio className="radio6" value={5} />
                <Radio className="radio7" value={6} />
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("projectApp", {
              rules: [{ required: true, message: "项目平台不能为空" }]
            })(
              <Select
                placeholder="请选择项目平台"
                onChange={handleSelectChange}
              >
                {option.map((res, index) => {
                  return (
                    <Option key={index} value={res}>
                      {res}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("projectDesc", {
              rules: [{ required: true, message: "项目描述不能为空" }]
            })(<TextArea placeholder="请输入项目描述" rows={4} />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
export default WrappedNormalLoginForm;
