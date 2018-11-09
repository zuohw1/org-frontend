import React from 'react';
import {
  Table, Button,
} from 'antd';

export default ({
  attachData,
  loading,
}) => {
  function getFields() {
    const children = [];
    children.push(
      {
        title: '附件信息',
        dataIndex: 'rownum',
        key: 'rownum',
        align: 'center',
      },
    );
    children.push(
      {
        title: '文档标题',
        dataIndex: 'attName',
        key: 'attName',
        align: 'center',
      },
    );
    children.push(
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: () => (
          <span>
            <a href="#">下载</a>
          </span>
        ),
      },
    );
    return children;
  }

  return (
    <div>
      <Button>上传附件</Button>
      <Table columns={getFields()} loading={loading} dataSource={attachData} pagination={false} />
    </div>
  );
};
