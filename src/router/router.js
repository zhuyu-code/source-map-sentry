import React,{ Fragment ,useState,useEffect } from 'react';
import { Layout, Menu, Avatar, Icon,Popover } from 'antd';
import  {Link,Route} from 'react-router-dom';
import {useLocation, Redirect} from 'react-router';
import Logo from '../static/logo.png';
import './router.less'
import history from '../utils/history'
import Product from '../components/product/index';
import Project from '../components/project/index';
import Version from '../components/version/index';
import ErrorList from '../components/error/index';

const { Header, Content, Footer } = Layout;
const text = <span>个人信息</span>;
let content;
export default (()=>{
     const location= useLocation();
     const [collapsed, setCollapse] = useState(false);
     let userInfo;
     function loginOut(){
      localStorage.clear();
      history.push('/home')
    }
     useEffect(() => {
     userInfo=JSON.parse(localStorage.getItem('userInfo'));
     content=(
     <div className='loginout'>
       <div>{userInfo.userName}</div>
       <a onClick={loginOut}>退出登录</a>
     </div>
     )
     }, [])
      function onCollapse(collapsed) {
        setCollapse(collapsed);
      };
      function getRout(){
        if(location.pathname==='/main'){
          return '首页'
        }
        if(location.pathname.split('/')[location.pathname.split('/').length-1]=="product"){
          return <div className="home-product">
            <Icon type="code-sandbox" style={{marginRight:"10px"}}/>
            <span>产品信息</span>
            </div>
        }else if(location.pathname.split('/')[location.pathname.split('/').length-1]=="project"){
          return <div className="home-product">
          <Icon type="code-sandbox" style={{marginRight:"10px"}}/>
          <span>项目信息</span>
          </div>
        }else if(location.pathname.split('/')[location.pathname.split('/').length-1]=="version"){
          return '版本信息'
        }else if(location.pathname.split('/')[location.pathname.split('/').length-1]=='errorList'){
          return "错误信息"
        }
      }
    return (
     <Fragment>
       <Layout style={{ minHeight: '100vh'}}>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
           <h1 style={{paddingLeft:'20px'}}>{ getRout()}</h1>
          <div className="home-header-right">
          <Link to="/home" style={{marginRight:"40px",fontSize:"20px",padding:"6px 10px"}}>首页</Link>
           <Popover placement="bottomRight" title={text} content={content} trigger="click">
                <Avatar
                  style={{ color: '#f56a00', backgroundColor: '#fde3cf' ,marginRight:"10px"}}>
                   {JSON.parse(localStorage.getItem("userInfo")).userName.slice(0,1)}
                </Avatar>
                <span style={{marginRight:"40px",fontSize:"20px"}}>{JSON.parse(localStorage.getItem("userInfo")).userName}</span>
          </Popover>
          </div>

          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Route exact path="/product" component={Product}/>
            <Route path="/product/:productId/project" component={Project}/>
            <Route path="/product/project/:projectId/version" component={Version}/>
            <Route path="/product/project/version/:versionId/errorList" component={ErrorList}/>
            <Redirect to='/product'></Redirect>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by zhuyu</Footer>
        </Layout>
      </Layout>
    </Fragment>

    )
})
