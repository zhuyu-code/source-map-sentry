import React from 'react'
import { Route, Redirect } from 'react-router-dom';
function Protected(props) {
    const { Component } = props;
    // 判断是否登录
    return (
        <Route
            {...props}
            render={(props) =>
                localStorage.getItem('userInfo') ?
                    <Component /> : //如果能在localstorage里面取到登录状态是成功的，则渲染这个组件
                    <Redirect to={      //否则重定向,跳到login页面
                        {
                            pathname: '/login',
                            state: { from: props.location.pathname } //多传一个状态
                        }
                    } />
            } />
    )
}
export default Protected
