import React from 'react';
import {
  Breadcrumb, Layout,
} from 'antd';
import '../../../../assets/styles/module.less';
import OrgForm from './org-form';

const { Content } = Layout;

const orgCostCenterView = (state) => {
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '10px 0' }}>
        <Breadcrumb.Item>
          组织管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <strong>组织成本变更维护</strong>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="page-module"
        style={{
          background: '#fff', padding: '15px', margin: 0,
        }}
      >
        <div>
          <OrgForm {...state} />
        </div>
      </Content>
    </React.Fragment>
  );
};

export default orgCostCenterView;
