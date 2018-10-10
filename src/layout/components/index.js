import React from 'react';
import {
  Layout, Menu, Icon, Input,
} from 'antd';
import { Route, Switch, Link } from 'dva/router';
import logoImg from '../../images/logo.png';
import './App.css';
import 'antd/dist/antd.css';
import Manpower from '../../components/Manpower';

const { SubMenu } = Menu;

const MainLayout = (state) => {
  console.log(state);
  console.log(state.menus);
  return (
    <div className="App">
      <div className="AppHeader">
        <div className="headerTop">
          <div className="headerTopL">
            <img src={logoImg} alt="" />
          </div>
          <span className="headerTopC"><b>中国联通HR网上服务平台</b></span>
          <div className="headerTopR">
            <Input.Search
              placeholder="请输入功能或服务关键字"
              enterButton="搜索"
              onSearch={value => console.log(value)}
            />
          </div>
        </div>
        <div className="headerBottom">
          <nav>
            <a href="jacascript::void(0)">员工服务大厅</a>
            <a href="jacascript::void(0)" className="navActive">人力业务管理</a>
            <a href="jacascript::void(0)">数据决策中心</a>
          </nav>
        </div>
      </div>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider
          collapsible
          collapsed={state.collapsed}
          onCollapse={() => { state.dispatch({ type: 'layout/onCollapse' }); }}
        >
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {
              state.menus.map((item) => {
                if (item.pid === 0) {
                  const children = state.menus.filter(i => i.pid === item.id);
                  return children.length !== 0 ? (
                    <SubMenu
                      key={item.id}
                      title={<span><Icon type={item.iconUrl} />{item.menuName}</span>}
                    >
                      {children.map(ele => (
                        <Menu.Item key={ele.id}>
                          <Link to={ele.url || ''}>{ele.menuName}</Link>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ) : (
                    <Menu.Item key={item.id}>
                      <Link to={item.url || ''}><Icon type={item.iconUrl} />{item.menuName}</Link>
                    </Menu.Item>
                  );
                } else {
                  return '';
                }
              })
            }
          </Menu>
        </Layout.Sider>
        <Switch>
          <Route exact path="/" component={Manpower} />
        </Switch>
      </Layout>
    </div>
  );
};

export default MainLayout;
