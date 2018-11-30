import React from 'react';
import {
  Table, Pagination,
} from 'antd';

export default (props) => {
  const {
    loading,
    actions,
    tableData,
    search,
  } = props;
  const { listTable } = actions;
  const data = tableData.records;
  const onChange = (pageNumber, pageSize) => {
    const searchF = { ...search, pageNumber, pageSize };
    listTable(searchF);
  };
  const onChangePageSize = (current, size) => {
    const searchF = { ...search, pageSize: size, pageNumber: current };
    listTable(searchF);
  };
  const { current, size, total } = tableData;
  /* 列表字段 */
  const tableCols = [{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    width: 50,
  }, {
    title: '文档标题',
    dataIndex: 'documentTitle',
    key: 'documentTitle',
    align: 'center',
    width: 250,
  }, {
    title: '文档类型',
    dataIndex: 'documentType',
    key: 'documentType',
    align: 'center',
    width: 150,
  }, {
    title: '所属模块',
    dataIndex: 'module',
    key: 'module',
    align: 'center',
    width: 150,
  }, {
    title: '下载次数',
    dataIndex: 'windowLoad',
    key: 'windowLoad',
    align: 'center',
    width: 150,
  }];
  function getFields() {
    const children = [];
    for (let i = 0; i < tableCols.length; i += 1) {
      children.push(tableCols[i]);
    }
    children.push(
      {
        title: '操作',
        dataIndex: 'load',
        key: 'load',
        align: 'center',
        width: 150,
        render: () => (
          <span>
            <a href=" javascript:void(0);">下载</a>
          </span>
        ),
      },
    );
    return children;
  }
  return (
    <div>
      <Table
        columns={getFields()}
        loading={loading}
        dataSource={data}
        pagination={false}
        size="small"
        bordered
        scroll={{ y: document.body.scrollHeight - 460 }}
        style={{ marginTop: 10 }}
      />
      <Pagination
        showQuickJumper
        current={current}
        total={total}
        pageSize={size}
        onChange={onChange}
        onShowSizeChange={onChangePageSize}
        showTotal={tota => `共${tota}条`}
        showSizeChanger
        style={{ margin: 10, float: 'right' }}
      />
    </div>
  );
};
