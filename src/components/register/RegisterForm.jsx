import React, { useContext, useEffect } from "react";
import { Form, Input, Icon, Button, message } from "antd";
import { register } from "../../api/index";
import history from "../../utils/history";
const FormItem = Form.Item;

const Register = props => {
  const { getFieldDecorator } = props.form;
  const key = "register";
  function goLogin() {
    history.push("/login");
  }
  function handleRegister(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        message.loading({ content: "loading...", key });
        register(values).then(res => {
          if (res.code === 1) {
            message.success({
              content: res.msg,
              key,
              duration: 1,
              onClose: goLogin
            });
          } else {
            message.error({ content: res.msg, key, duration: 2 });
          }
        });
      }
    });
  }
  return (
    <div className="main">
      <div className="gradu-login-content">
        <div className="gradu-login-logo">
          <h1>Source-map系统</h1>
          <h2>注册</h2>
        </div>
        <Form className="gradu-login-form">
          {/* 工号 */}
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "产品名不能为空" }]
            })(
              <Input
                label="用户名"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            )}
          </FormItem>
          {/* 密码 */}
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "产品名不能为空" }]
            })(
              <Input
                label="密码"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          {/* 登陆按钮 */}
          <div className="gradu-login-opts">
            <Button type="primary" htmlType="submit" onClick={handleRegister}>
              注册
            </Button>
          </div>
          <div className="gradu-login-opts2">
            <a onClick={goLogin}>已有账号？去登录</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

const WrappedRegister = Form.create({ name: "register" })(Register);
export default WrappedRegister;
