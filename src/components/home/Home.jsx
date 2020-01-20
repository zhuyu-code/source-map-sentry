import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Avatar, Popover } from "antd";
import imgJs from "../../static/quanzhan.svg";
import timeJs from "../../static/shishi.svg";
import ziJs from "../../static/zhineng.svg";
import safeJs from "../../static/anquan.svg";
import history from "../../utils/history";
import "./index.less";

export default observer(function Home() {
  const content = (
    <a className="loginout" onClick={loginout}>
      退出登录
    </a>
  );
  function loginout() {
    localStorage.clear();
    history.push("/home");
  }
  return (
    <div>
      <div className="home-header">
        <div className="logo"></div>
        <ul>
          <li>
            <Link to="/home">首页</Link>
          </li>
          <li>
            <a>文档</a>
          </li>
          <li>
            <a>博客</a>
          </li>
          <li>
            <Link to="/product">控制台</Link>
          </li>
          {localStorage.getItem("userInfo") ? (
            <li>
              <a>
                <Popover
                  placement="bottomLeft"
                  title={JSON.parse(localStorage.getItem("userInfo")).userName}
                  content={content}
                  trigger="click"
                >
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {JSON.parse(
                      localStorage.getItem("userInfo")
                    ).userName.slice(0, 1)}
                  </Avatar>
                </Popover>
              </a>
            </li>
          ) : (
            <Fragment>
              <li>
                <Link to="/login">登录</Link>
              </li>
              <li>
                <Link to="/register">注册</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
      <div className="home-content">
        <div className="home-content_left">
          <p className="home-content_left_p1">轻量级的错误监控平台</p>
          <p className="home-content_left_p2">
            简洁、高效的 Bug
            追踪，轻量、便捷的项目管理，安全、稳定的数据保障，完美地将
            Bug管理与团队协作结合在一起。项目管理，本就是一种优雅的艺术
          </p>
          <p className="home-content_left_p3">
            累计处理错误<span>31115</span>
          </p>
        </div>
        <div className="home-content_bottom">
          <div>
            <img src={imgJs} alt="" />
            <p className="home-content-title">JavaScript</p>
            <p>支持JavaScript所有项目</p>
          </div>
          <div>
            <img src={timeJs} alt="" />
            <p className="home-content-title">实时</p>
            <p>第一时间发送错误报警</p>
          </div>
          <div>
            <img src={ziJs} alt="" />
            <p className="home-content-title">智能</p>
            <p>各类分析</p>
          </div>
          <div>
            <img src={safeJs} alt="" />
            <p className="home-content-title">安全</p>
            <p>全站信息不会泄漏</p>
          </div>
        </div>
      </div>
    </div>
  );
});
