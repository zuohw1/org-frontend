import React from 'react';
import {
  Layout, Menu, Icon, Input,
} from 'antd';
import { Route, Switch, Link } from 'dva/router';
import logoImg from '../../assets/images/logo.png';
import 'antd/dist/antd.less';
import app from '../../assets/styles/App.css';
import Manpower from './Manpower';
import Orgsearch from '../../org/containers/orgsearch';
import OrgApproval from '../../org/containers/approval';
import KeyRespQuery from '../../post/containers/keyrespquery';
import KeyResp from '../../post/containers/keyresp';
import KeyRespRank from '../../post/containers/keyresprank';


const { SubMenu } = Menu;

const MainLayout = (state) => {
  console.log(state);
  console.log(state.menus);
  return (
    <div className={app.App}>
      <div className={app.AppHeader}>
        <div className={app.headerTop}>
          <div className={app.headerTopL}>
            <img src={logoImg} alt="" />
          </div>
          <span className={app.headerTopC}><b>中国联通HR网上服务平台</b></span>
          <div className={app.headerTopR}>
            <Input.Search
              placeholder="请输入功能或服务关键字"
              enterButton="搜索"
              onSearch={value => console.log(value)}
            />
          </div>
        </div>
        <div className={app.headerBottom}>
          <nav>
            <a href="jacascript::void(0)">员工服务大厅</a>
            <a href="jacascript::void(0)" className={app.navActive}>人力业务管理</a>
            <a href="jacascript::void(0)">数据决策中心</a>
          </nav>
        </div>
      </div>
      <Layout style={{ minHeight: '75vh' }}>
        <Layout.Sider
          collapsible
          collapsed={state.collapsed}
          onCollapse={() => { state.dispatch({ type: 'layout/onCollapse' }); }}
          theme="light"
        >
          <div className={app.logo} />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {
              state.menus.map((item) => {
                if (item.pid === 0) {
                  const children = state.menus.filter(i => i.pid === item.id);
                  return children.length !== 0 ? (
                    <SubMenu
                      key={item.id}
                      title={<span><Icon type={item.iconUrl} /><span>{item.menuName}</span></span>}
                    >
                      {children.map(ele => (
                        <Menu.Item key={ele.id}>
                          <Link to={ele.url || ''}><span>{ele.menuName}</span></Link>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ) : (
                    <Menu.Item key={item.id}>
                      <Link to={item.url || ''}><Icon type={item.iconUrl} /><span>{item.menuName}</span></Link>
                    </Menu.Item>
                  );
                } else {
                  return '';
                }
              })
            }
          </Menu>
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Switch>
            <Route exact path="/" component={Manpower} />
            <Route exact path="/org/search" component={Orgsearch} />
            <Route exact path="/org/approval" component={OrgApproval} />
            <Route exact path="/post/keyrespquery" component={KeyRespQuery} />
            <Route exact path="/post/keyresp" component={KeyResp} />
            <Route exact path="/post/keyresprank" component={KeyRespRank} />
          </Switch>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
