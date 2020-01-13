import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Router from './router'
import './index.less';
import {BrowserRouter} from 'react-router-dom';
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
   <BrowserRouter>
    <Router/>
  </BrowserRouter>
</ConfigProvider>
,document.getElementById('root'));
