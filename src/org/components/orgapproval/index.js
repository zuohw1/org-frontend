import React from 'react';
import { Layout, Breadcrumb, Tabs } from 'antd';
import Search from './search';
import Table from './table';
import '../../../assets/styles/module.less';

const { Content } = Layout;

const OrgApproval = (state) => {
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          组织管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          组织批文前置流程
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="page-module"
        style={{
          background: '#fff', padding: 24, margin: 0, minHeight: 280,
        }}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="组织变更依据" key="1">
            <Search {...state} />
            <Table {...state} />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </React.Fragment>
  );
};

export default OrgApproval;
