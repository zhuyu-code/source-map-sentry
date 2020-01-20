import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Icon,
  Tooltip,
  message
} from "antd";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router";
import { updateProject, getProjectOne } from "../../../api/index";
import { useProjectDetailStore } from "../store/index";
import copy from "copy-to-clipboard";
const { TextArea } = Input;
const { Option } = Select;
const NormalLoginForm = observer(props => {
  const location = useLocation();
  const { getFieldDecorator } = props.form;
  const {
    setProject,
    getProject
  } = useProjectDetailStore();
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState(["平台1", "平台2", "平台3", "平台4"]);
  const productId = location.pathname.split("/")[2];
  const projectId = location.pathname.split("/")[4];
  useEffect(() => {
    getProjectOne(projectId).then(res => {
      setProject(res.data);
    });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        values.productId = productId;
        updateProject(values, projectId).then(res => {
          console.log(res);
          if (res.code === 800) {
            message.success(res.message);
          } else if (res.code === 801) {
            message.warning(res.message);
          } else {
            message.error("更新失败");
          }
        });
      }
    });
    setVisible(false);
  }

  function handleSelectChange(value) {
    console.log(value);
  }
  function copyUrl(id) {
    return () => {
      copy(id);
      message.info("复制成功，如果失败，请在输入框内手动复制.");
    };
  }
  return (
    <div className="projectDetail-form-area">
      <Form className="login-form" labelAlign="left">
        <Form.Item label="项目名">
          {getFieldDecorator("projectName", {
            rules: [{ required: true, message: "项目名不能为空" }],
            initialValue: getProject().projectName
          })(<Input placeholder="输入项目名" />)}
        </Form.Item>

        <Form.Item label="项目平台">
          {getFieldDecorator("projectApp", {
            rules: [{ required: true, message: "项目平台不能为空" }],
            initialValue: getProject().projectApp
          })(
            <Select placeholder="请选择项目平台" onChange={handleSelectChange}>
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

        <Form.Item label="项目背景颜色">
          {getFieldDecorator("projectColor", {
            rules: [{ required: true, message: "项目背景颜色必选" }],
            initialValue: getProject().projectColor
          })(
            <Radio.Group>
              <Radio buttonStyle="solid" className="radio1" />
              <Radio className="radio2" value="1" />
              <Radio className="radio3" value="2" />
              <Radio className="radio4" value="3" />
              <Radio className="radio5" value="4" />
              <Radio className="radio6" value="5" />
              <Radio className="radio7" value="6" />
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item label="创建人">
          {getFieldDecorator("createPerson", {
            initialValue: getProject().createPerson
          })(<Input disabled />)}
        </Form.Item>

        <Form.Item label="项目Id">
          {getFieldDecorator("projectId", {
            initialValue: getProject().projectId
          })(
            <Input
              style={{ margin: "20px 0" }}
              addonBefore="App-id"
              addonAfter={
                <Tooltip title={<div>粘贴</div>}>
                  <Icon onClick={copyUrl(getProject().projectId)} type="copy" />
                </Tooltip>
              }
              disabled
            />
          )}
        </Form.Item>

        <Form.Item label="项目描述">
          {getFieldDecorator("projectDesc", {
            rules: [{ required: true, message: "项目描述不能为空" }],
            initialValue: getProject().projectDesc
          })(<TextArea placeholder="请输入项目描述" rows={4} />)}
        </Form.Item>

        <Button
          style={{ backgroundColor: "#00a680", color: "#fff" }}
          onClick={handleSubmit}
        >
          修改
        </Button>
      </Form>
    </div>
  );
});
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
export default WrappedNormalLoginForm;
