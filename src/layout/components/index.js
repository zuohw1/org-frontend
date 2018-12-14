import React from 'react';
import {
  Layout, Menu, Icon, Input,
} from 'antd';
import { Route, Switch, Link } from 'dva/router';
import logoImg from '../../assets/images/logo.png';
import 'antd/dist/antd.less';
import app from '../../assets/styles/app.less';
import Main from './main';
import OrgSearch from '../../org/containers/org-search';
import OrgExportCondition from '../../org/components/orgsearch/components/org-export-condition';
import OrgApproval from '../../org/containers/approval';
import OrgCreate from '../../org/containers/org-create';
import OrgMerge from '../../org/containers/org-merge';
import OrgRename from '../../org/containers/org-rename';
import OrgDelete from '../../org/containers/org-delete';
import ChangeDetail from '../../org/containers/change-detail';
import DocumentLoad from '../../org/containers/document-load';


const { SubMenu } = Menu;

const MainLayout = (state) => {
  const route = (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/org/search" component={OrgSearch} />
      <Route exact path="/org/search/orgExportCondition" component={OrgExportCondition} />
      <Route exact path="/org/approval" component={OrgApproval} />
      <Route exact path="/org/create" component={OrgCreate} />
      <Route exact path="/org/merge" component={OrgMerge} />
      <Route exact path="/org/rename" component={OrgRename} />
      <Route exact path="/org/delete" component={OrgDelete} />
      <Route path="/org/changeDetail" component={ChangeDetail} />
      <Route exact path="/org/documentLoad" component={DocumentLoad} />
    </Switch>
  );
  const ret = state.headless ? (
    <Layout style={{ padding: '5px' }}>
      {route}
    </Layout>
  ) : (
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
            />
          </div>
        </div>
        <div className={app.headerBottom}>
          <nav>
            <a href=" javascript:;">员工服务大厅</a>
            <a href=" javascript:;" className={app.navActive}>人力业务管理</a>
            <a href=" javascript:;">数据决策中心</a>
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
        <Layout style={{ padding: '5px' }}>
          {route}
        </Layout>
      </Layout>
    </div>);
  return ret;
};

export default MainLayout;
