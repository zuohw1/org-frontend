import React from 'react';
import {
  Card, Divider, Table, Tabs,
} from 'antd';

const { TabPane } = Tabs;

const OrgView = (state) => {
  console.log(state);

  const columns = [{
    title: '组织名称',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  }, {
    title: '创建日期',
    dataIndex: 'age',
    key: 'age',
    width: 50,
  }, {
    title: '状态',
    dataIndex: 'address',
    key: 'address',
    width: 50,
  }, {
    title: '处理',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 100,
    render: () => (
      <span>
        <a href=" javascript:;">查看</a>
        <Divider type="vertical" />
        <a href=" javascript:;">修改</a>
        <Divider type="vertical" />
        <a href=" javascript:;">删除</a>
      </span>
    ),
  }];

  const { loading, data } = state;

  return (
    <Tabs>
      <TabPane tab="新增业务结果" key="1">
        <Card>
          <p><strong>组织变更涉及的组织的增设包括：</strong></p>
          <p>    1、新增的组织。     如果需要重新处理的，请进行删除后，重新处理。</p>
        </Card>
        <Table
          style={{
            marginTop: 50,
          }}
          columns={columns}
          loading={loading}
          dataSource={data}
          pagination={false}
          size="small"
          bordered
        />
      </TabPane>
    </Tabs>
  );
};
export default OrgView;
