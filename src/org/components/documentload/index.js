import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Table from './main-table';
import Search from './search';
import '../../../assets/styles/module.less';

const { Content } = Layout;

const documentLoad = (state) => {
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '10px 0' }}>
        <Breadcrumb.Item>
          组织管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <strong>文档下载</strong>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="page-module"
        style={{
          background: '#fff', padding: '15px', margin: 0, minHeight: 452,
        }}
      >
        <Search {...state} />
        <Table {...state} />
      </Content>
    </React.Fragment>
  );
};
export default documentLoad;
