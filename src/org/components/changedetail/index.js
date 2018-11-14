import React from 'react';
import {
  Breadcrumb, Menu, Layout, Row, Col,
} from 'antd';
import '../../../assets/styles/less/module.less';
import {
  Route, Switch, Link,
} from 'dva/router';
import ApprovalCard from '../../containers/approval-card';
import SearchTable from '../../../components/search-table';

const { Content } = Layout;

const ChangeDetail = () => {
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '10px 0' }}>
        <Breadcrumb.Item>
          组织管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <strong>组织新增</strong>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="page-module"
        style={{
          background: '#fff', padding: '15px', margin: 0, minHeight: 280,
        }}
      >
        <Row gutter={50}>
          <Col span={4}>
            <Menu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Link to={{
                  pathname: '/org/changedetail',
                }}
                ><span>变更依据</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={{
                  pathname: '/org/changedetail/org',
                }}
                ><span>业务操作</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={{
                  pathname: '/org/changedetail/list',
                }}
                ><span>查看</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>
            <Switch>
              <Route exact path="/org/changeDetail" component={ApprovalCard} />
              <Route exact path="/org/changeDetail/org" component={SearchTable} />
            </Switch>
          </Col>
        </Row>
      </Content>
    </React.Fragment>
  );
};

export default ChangeDetail;
