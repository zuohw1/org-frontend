import React from 'react';
import {
  Table,
  Modal,
  Pagination,
  Button,
  Divider,
} from 'antd';
import Model from './model';

export default ({
  tableData,
  actions,
  record,
  search,
  modal,
  form,
  table_columns,
  loading,
}) => {
  const {
    isModeShow,
    getRecord,
    updataRecord,
    listTable,
  } = actions;
  const onClick = (_, records) => {
    getRecord(records);
    isModeShow(true);
  };

  const data = tableData.records;

  /* 修改 */
  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        /* eslint no-console: 0 */
        console.log('Received values of form: ', values);
        updataRecord(values);
        form.resetFields();
      }
    });
  };

  const onCancel = (e) => {
    e.preventDefault();
    isModeShow(false);
    form.resetFields();
    getRecord({});
  };

  const onChange = (pageNumber, pageSize) => {
    const searchF = { ...search, pageSize, pageNumber };
    listTable(searchF);
  };

  const onChangePageSize = (current, size) => {
    const searchF = { ...search, pageSize: size, pageNumber: current };
    listTable(searchF);
  };

  const { current, size, total } = tableData;

  function getFields() {
    const children = [];
    for (let i = 0; i < table_columns.length; i++) {
        children.push(table_columns[i]);
    }
    children.push(
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, records) => (
          <span>
          <a href="javascript:;" onClick={() => onClick(text, records)}>查看</a>
          <Divider type="vertical" />
          <a href="javascript:;">修改</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
          </span>
        ),
      });
    return children;
  }

  return (
    <div>
      <Modal
        title="变更依据"
        visible={modal}
        onOk={onSubmit}
        onCancel={onCancel}
        maskClosable={false}
        destroyOnClose
      >
        <Model
          record={record}
          form={form}
          actions={actions}
        />
      </Modal>
      <Button type="primary" style={{ margin: '20px 0' }}
              onClick={onClick}>新增</Button>
      <Table columns={getFields()} loading={loading} dataSource={data} pagination={false} />
      <Pagination
        showQuickJumper
        current={current}
        total={total}
        pageSize={size}
        onChange={onChange}
        onShowSizeChange={onChangePageSize}
        showTotal={tota => `共 ${tota} 条`}
        showSizeChanger
        style={{ marginTop: 10, float: 'right' }}
      />
    </div>
  );
};
