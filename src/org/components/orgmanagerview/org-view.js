import React from 'react';
import {
  Table, Tabs,
} from 'antd';

const { TabPane } = Tabs;

const OrgView = (state) => {
  const columns = [{
    title: '组织名称',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  }, {
    title: '变更说明',
    dataIndex: 'remark',
    key: 'remark',
    width: 200,
  }, {
    title: '日期',
    dataIndex: 'create_date',
    key: 'create_date',
    width: 50,
  }];

  const { loading, viewData } = state;

  return (
    <Tabs>
      <TabPane tab="组织表更业务" key="1">
        <Table
          style={{
            marginTop: 50,
          }}
          columns={columns}
          loading={loading}
          dataSource={viewData}
          pagination={false}
          defaultExpandAllRows
          size="small"
          bordered
        />
      </TabPane>
    </Tabs>
  );
};
export default OrgView;
