import React from 'react';
import {
  Table,
} from 'antd';

export default ({
                  attachData,
                  loading,
                }) => {

  const data = [];

  function getFields() {
    const children = [];
    children.push(
      {
        title: '附件信息',
        dataIndex: 'key',
        key: 'key',
        align: 'center',
      });
    children.push(
      {
        title: '文档标题',
        dataIndex: 'attName',
        key: 'attName',
        align: 'center',
      });
    children.push(
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, records) => (
          <span>
          <a href="javascript:;">下载</a>
          </span>
        ),
      });
    return children;
  }

  return (
    <Table columns={getFields()} loading={loading} dataSource={data} pagination={false} />
  );
};
