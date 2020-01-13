import React, { useContext, useEffect } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import {login} from '../../api/index';
import history from '../../utils/history'
const FormItem = Form.Item;

const Login= ((props)=>{
  const { getFieldDecorator } = props.form;
    function goRegister(){
     history.push('/register');
    }
    function handleLogin(e){
      e.preventDefault();
     props.form.validateFields((err, values) => {
        if (!err) {
          login(values).then(data=>{
            if(data.token){
              localStorage.setItem('token',data.token);
              localStorage.setItem('userInfo',JSON.stringify(data.data));
              message.success(data.message);
              history.replace('/main');
            }else{
              message.error(data.msg);
            }
          })
        }
      });
    };
    return (

           <div className="main">
           <div className="gradu-login-content">
                <div className="gradu-login-logo">
                    <h1>Source-map系统</h1>
                    <h2>登陆</h2>
                </div>
                <Form className="gradu-login-form" >
                    {/* 工号 */}
                    <FormItem>
                      {getFieldDecorator('userName', {
                      rules: [{ required: true, message: '产品名不能为空' }],
                    })(
                      <Input label='用户名' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                    </FormItem>
                    {/* 密码 */}
                    <FormItem>
                      {getFieldDecorator('password', {
                      rules: [{ required: true, message: '产品名不能为空' }],
                    })(
                      <Input label='密码' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                    </FormItem>
                    {/* 登陆按钮 */}
                    <div className='gradu-login-opts'>
                        <Button type="primary" htmlType="submit" onClick={handleLogin}>
                            登陆
                        </Button>
                    </div>
                    <div className='gradu-login-opts2'>
                      <a onClick={goRegister}>没有账号？去注册</a>
                    </div>
                </Form>
            </div>
           </div>

    )
})

const WrappedLogin = Form.create({ name: 'login' })(Login);
export default WrappedLogin;
