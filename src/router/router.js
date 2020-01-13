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

const { Header, Content, Footer, Sider } = Layout;
const text = <span>个人信息</span>;
let content;
export default (()=>{
     const location= useLocation();
     const [collapsed, setCollapse] = useState(false);
     let userInfo;
     function loginOut(){
      localStorage.clear();
      history.push('/login')
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
          return '产品信息'
        }else if(location.pathname.split('/')[location.pathname.split('/').length-1]=="project"){
          return '项目信息'
        }else if(location.pathname.split('/')[location.pathname.split('/').length-1]=="version"){
          return '版本信息'
        }else if(location.pathname.split('/')[location.pathname.split('/').length-1]=='errorList'){
          return "错误信息"
        }
      }
    return (
     <Fragment>
       <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div
          style={{
            height: '32px',
            backgroundImage: `url(${Logo})`,
            backgroundSize:'100% 100%',
            margin: '16px'
          }}/>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

            <Menu.Item key="1">
            <Link to="/main">
              <Icon type="pie-chart" style={{color:'black'}}/>
              <span>欢迎来到首页</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
            <Link to="/product">
              <Icon type="desktop" style={{color:'black'}}/>
              <span>产品信息</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
           <h1 style={{paddingLeft:'20px'}}>{ getRout()}</h1>
           <Popover placement="bottomRight" title={text} content={content} trigger="click">
           <Avatar size="large" icon="user" style={{marginRight:'20px'}}/>
        </Popover>

          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Route path="/main">
              主页
            </Route>
            <Route exact path="/product" component={Product}/>
            <Route path="/product/:productId/project" component={Project}/>
            <Route path="/product/project/:projectId/version" component={Version}/>
            <Route path="/product/project/version/:versionId/errorList" component={ErrorList}/>
            <Redirect to='/main'></Redirect>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by zhuyu</Footer>
        </Layout>
      </Layout>
    </Fragment>

    )
})
